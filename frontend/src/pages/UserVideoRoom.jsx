import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const SIGNALING_SERVER_URL = import.meta.env.SIGNALING_SERVER_URL;

const UserVideoRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const sock = io(SIGNALING_SERVER_URL);
    setSocket(sock);
    let pc;
    let isAnswerCreated = false;

    // 1. Get local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    // 2. Join meeting room
    sock.emit("join", { meetingId, role: "user" });

    // 3. Wait for mentor's offer
    sock.on("offer", async ({ offer }) => {
      setWaiting(false);
      await createPeerConnection(offer);
    });

    // 4. Handle ICE from mentor
    sock.on("ice-candidate", async ({ candidate }) => {
      if (pc && candidate) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (e) {
          // ignore
        }
      }
    });

    // 5. Create peer connection and answer
    async function createPeerConnection(offer) {
      pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }
        ]
      });
      setPeerConnection(pc);

      // Add local tracks
      if (localStream) {
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      }

      // Handle remote stream
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          sock.emit("ice-candidate", { meetingId, candidate: event.candidate });
        }
      };

      // Set remote offer and create/send answer
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sock.emit("answer", { meetingId, answer });
      isAnswerCreated = true;
      setCallActive(true);
    }

    // Clean up
    return () => {
      sock.disconnect();
      if (pc) pc.close();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line
  }, [meetingId, SIGNALING_SERVER_URL, localStream]);

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

  // End call handler
  const handleEndCall = () => {
    if (peerConnection) peerConnection.close();
    if (socket) socket.disconnect();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    setCallActive(false);
    setRemoteStream(null);
    setPeerConnection(null);
    navigate("/my-Meetings");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h2 className="text-2xl font-bold mb-2">User Video Call Room</h2>
      <p className="mb-4">Meeting ID: {meetingId}</p>
      <div className="flex gap-8">
        <div>
          <p className="text-center mb-1">Your Video</p>
          <video ref={localVideoRef} autoPlay playsInline muted className="w-64 h-48 bg-black rounded" />
        </div>
        <div>
          <p className="text-center mb-1">Mentor Video</p>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 bg-black rounded" />
        </div>
      </div>
      {waiting && <p className="text-yellow-600 font-semibold">Waiting for mentor to start the call...</p>}
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

export default UserVideoRoom;
