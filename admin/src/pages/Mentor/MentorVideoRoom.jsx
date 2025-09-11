import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { MentorContext } from "../../context/MentorContext";

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

  const { completeMeeting } = useContext(MentorContext)

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
    if (peerConnectionRef.current) peerConnectionRef.current.close();
    if (socketRef.current) socketRef.current.disconnect();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    setCallActive(false);
    setRemoteStream(null);
    peerConnectionRef.current = null;
    socketRef.current = null;
    // Mark meeting as completed
    completeMeeting(meetingId);
    navigate("/Mentor-Meetings");
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

  useEffect(() => {
    if (callActive) {
      setTimerActive(true);
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimerActive(false);
      setTimer(0);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [callActive]);

  function formatTimer(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h2 className="text-2xl font-bold mb-2">Video Call Room</h2>
      <p className="mb-4">Meeting ID: {meetingId}</p>
      <div className="flex gap-8">
        <div>
          <p className="text-center mb-1">Your Video</p>
          <video ref={localVideoRef} autoPlay playsInline muted className="w-64 h-48 bg-black rounded" />
        </div>
        <div>
          <p className="text-center mb-1">User Video</p>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 bg-black rounded" />
        </div>
      </div>
      {waiting && <p className="text-yellow-600 font-semibold">Waiting for user to join...</p>}
      {callActive && (
        <div className="flex flex-col items-center">
          <div className="text-lg font-mono">
            Timer: {formatTimer(timer)}
            {timer >= 1800 && (
              <span className="ml-3 text-yellow-600 font-semibold">Time extended for this meet</span>
            )}
          </div>
        </div>
      )}
      {callActive && (
        <button
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
          onClick={handleEndCall}
        >
          End Call
        </button>
      )}
    </div>
  );
};

export default MentorVideoRoom;
