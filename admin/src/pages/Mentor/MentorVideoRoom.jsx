import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { MentorContext } from "../../context/MentorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const SIGNALING_SERVER_URL = "http://localhost:5000";

const MentorVideoRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const initializedRef = useRef(false);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const [timer, setTimer] = useState(0); // seconds
  const [timerActive, setTimerActive] = useState(false);
  const timerIntervalRef = useRef(null);
  const exitedRef = useRef(false);
  const endedByMeRef = useRef(false); // <--- add this
  const { completeMeeting } = useContext(MentorContext);
  const { backendUrl } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    // Fetch user name for heading
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/Mentor/Meetings`, { headers: { dToken: localStorage.getItem('dToken') } });
        if (res.data.success && res.data.Meetings) {
          const meeting = res.data.Meetings.find(m => m._id === meetingId);
          if (meeting && meeting.userId && meeting.userId.name) setUserName(meeting.userId.name);
        }
      } catch (e) {}
    };
    fetchUserName();
  }, [meetingId, backendUrl]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // 1. Get local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // 2. Connect socket
        const sock = io(SIGNALING_SERVER_URL, { transports: ["websocket"] });
        socketRef.current = sock;
        sock.emit("join", { meetingId, role: "mentor" });
        // Emit mentor-ready after joining
        sock.emit("mentor-ready", { meetingId });

        // Attach call-ended handler immediately
        const handleCallEnded = ({ role }) => {
          if (endedByMeRef.current) return;
          if (role === "user") {
            toast.info("User has ended the call. Please mark the meeting as completed at your convenience.");
          } else {
            toast.info("Call ended.");
          }
          navigate("/Mentor-Meetings");
          setTimeout(() => {
            if (sock) sock.disconnect();
          }, 500);
        };
        sock.on("call-ended", handleCallEnded);

        // Listen for 'ready' with meetingId
        sock.on("ready", ({ meetingId: readyMeetingId }) => {
          if (readyMeetingId === meetingId) {
            setWaiting(false);
            createPeerConnection(stream, sock);
          }
        });

        // 4. Handle answer/ICE
        sock.on("answer", async ({ answer }) => {
          const pc = peerConnectionRef.current;
          if (pc) {
            await pc.setRemoteDescription(answer);
            setCallActive(true);
          }
        });
        sock.on("ice-candidate", async ({ candidate }) => {
          const pc = peerConnectionRef.current;
          if (pc && candidate) {
            try {
              await pc.addIceCandidate(candidate);
            } catch (e) { }
          }
        });
      });

    // Clean up
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (localStream) localStream.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line
  }, [meetingId, SIGNALING_SERVER_URL]);

  // Create peer connection and offer
  async function createPeerConnection(stream, sock) {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });
    peerConnectionRef.current = pc;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sock.emit("ice-candidate", { meetingId, candidate: event.candidate });
      }
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sock.emit("offer", { meetingId, offer });
  }

  // End call handler
  const handleEndCall = async () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    endedByMeRef.current = true; // <--- mark that this client ended the call
    if (peerConnectionRef.current) peerConnectionRef.current.close();
    if (socketRef.current) {
      socketRef.current.emit("call-ended", { meetingId, role: "mentor" });
    }
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    setCallActive(false);
    setRemoteStream(null);
    peerConnectionRef.current = null;
    // Mark meeting as completed
    completeMeeting(meetingId);
    navigate("/Mentor-Meetings");
    setTimeout(() => {
      if (socketRef.current) socketRef.current.disconnect();
      socketRef.current = null;
    }, 500);
  };

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Timer and media state persistence keys
  const timerKey = `meeting-timer-${meetingId}`;
  const micKey = `meeting-mic-${meetingId}`;
  const camKey = `meeting-cam-${meetingId}`;

  // Timer logic: countdown from 30:00, then count up
  useEffect(() => {
    // On first join, set start time if not present
    let startTime = localStorage.getItem(timerKey);
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(timerKey, startTime);
    }
    // On mount, restore mic/cam state
    const micState = localStorage.getItem(micKey);
    const camState = localStorage.getItem(camKey);
    if (micState !== null) setMicOn(micState === 'true');
    if (camState !== null) setCamOn(camState === 'true');
    // Apply to tracks after stream is ready
    if (localStream) {
      if (micState !== null) localStream.getAudioTracks().forEach(track => track.enabled = micState === 'true');
      if (camState !== null) localStream.getVideoTracks().forEach(track => track.enabled = camState === 'true');
    }
    // Timer interval
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setTimer(elapsed);
    }, 1000);
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
    // eslint-disable-next-line
  }, [localStream]);

  // Timer display logic
  function renderTimer() {
    const scheduled = 30 * 60; // 30 min in seconds
    if (timer < scheduled) {
      // Countdown
      const remain = scheduled - timer;
      const m = Math.floor(remain / 60).toString().padStart(2, '0');
      const s = (remain % 60).toString().padStart(2, '0');
      return <span className="font-mono text-lg">{m}:{s}</span>;
    } else {
      // Extra time
      const extra = timer - scheduled;
      const m = Math.floor(extra / 60).toString().padStart(2, '0');
      const s = (extra % 60).toString().padStart(2, '0');
      return <span className="font-mono text-lg text-yellow-600">Extra Time:{m}:{s}</span>;
    }
  }

  // Update mic/cam state in localStorage when toggled
  const handleToggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setMicOn(track.enabled);
        localStorage.setItem(micKey, track.enabled);
      });
    }
  };
  const handleToggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setCamOn(track.enabled);
        localStorage.setItem(camKey, track.enabled);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f6fa]">
      <div className="w-full bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">One to one mentorship with {userName || 'User'}</h2>
            <p className="text-gray-500 text-sm">Meeting ID: {meetingId}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              {renderTimer()}
            </div>
            {timer >= 1800 && (
              <span className="ml-2 text-yellow-600 font-semibold text-xs">Your scheduled time is over, now it’s extra time.</span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          <div className="flex flex-col items-center gap-2 flex-1">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full max-w-2xl h-[40vh] md:h-[55vh] bg-black rounded-lg border-2 border-primary object-contain" />
            <p className="text-center text-xs mt-1">Your Video</p>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full max-w-2xl h-[40vh] md:h-[55vh] bg-black rounded-lg border-2 border-primary object-contain" />
            <p className="text-center text-xs mt-1">User Video</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex gap-4">
            <button onClick={handleToggleMic} className={`p-3 rounded-full border transition ${micOn ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>{micOn ? <span role="img" aria-label="Mic On">🎤</span> : <span role="img" aria-label="Mic Off">🔇</span>}</button>
            <button onClick={handleToggleCam} className={`p-3 rounded-full border transition ${camOn ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>{camOn ? <span role="img" aria-label="Cam On">📷</span> : <span role="img" aria-label="Cam Off">🚫</span>}</button>
          </div>
          {callActive && (
            <button
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow"
              onClick={handleEndCall}
            >
              End Call
            </button>
          )}
        </div>
        {waiting && <p className="text-yellow-600 font-semibold text-center">Waiting for user to join...</p>}
      </div>
    </div>
  );
};

export default MentorVideoRoom;
