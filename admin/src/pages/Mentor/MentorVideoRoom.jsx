import { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { MentorContext } from "../../context/MentorContext";
import { AppContext } from "../../context/AppContext";

// Icons from lucide-react
import { Mic, MicOff, Video, VideoOff, PhoneOff, Clock, User } from 'lucide-react';
// const SIGNALING_SERVER_URL = "https://socketbackend-ooze.onrender.com";
const SIGNALING_SERVER_URL = "http://localhost:5000";

// A reusable component for rendering video streams with placeholder states (Light Theme)
const VideoPlayer = ({ videoRef, stream, label, isMuted = false, isCamOff = false, isWaiting = false }) => {
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, videoRef]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMuted}
                className={`w-full h-full object-cover transition-opacity duration-300 ${stream && !isCamOff ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* Placeholder UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                {isWaiting ? (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700">Waiting for user to join...</p>
                    </>
                ) : isCamOff && (
                     <>
                        <User size={64} className="mb-4 text-gray-400" />
                        <p className="text-lg font-semibold text-gray-600">Camera is off</p>
                    </>
                )}
            </div>
            <div className="absolute bottom-3 left-4 bg-black/40 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                {label}
            </div>
        </div>
    );
};


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
    const [timer, setTimer] = useState(0);
    const timerIntervalRef = useRef(null);
    const exitedRef = useRef(false);
    const endedByMeRef = useRef(false);
    const { completeMeeting } = useContext(MentorContext);
    const { backendUrl } = useContext(AppContext);
    const [userName, setUserName] = useState("");
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);

    // --- All your existing logic remains unchanged ---

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/Mentor/Meetings`, { headers: { dToken: localStorage.getItem('dToken') } });
                if (res.data.success && res.data.Meetings) {
                    const meeting = res.data.Meetings.find(m => m._id === meetingId);
                    if (meeting?.userId?.name) setUserName(meeting.userId.name);
                }
            } catch (e) { console.error("Failed to fetch user name", e); }
        };
        fetchUserName();
    }, [meetingId, backendUrl]);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
                const token = localStorage.getItem('dToken');
                const sock = io(SIGNALING_SERVER_URL, { 
                    transports: ["websocket"],
                    auth: { token }
                });
                socketRef.current = sock;
                sock.emit("join", { meetingId, role: "mentor" });
                sock.emit("mentor-ready", { meetingId });

                const handleCallEnded = ({ role }) => {
                    if (endedByMeRef.current) return;
                    toast.info(role === "user" ? "User ended the call. Please mark it as completed." : "Call ended.");
                    navigate("/Mentor-Meetings");
                    setTimeout(() => sock?.disconnect(), 500);
                };
                sock.on("call-ended", handleCallEnded);

                sock.on("ready", ({ meetingId: readyMeetingId }) => {
                    if (readyMeetingId === meetingId) {
                        setWaiting(false);
                        createPeerConnection(stream, sock);
                    }
                });

                sock.on("answer", async ({ answer }) => {
                    if (peerConnectionRef.current) {
                        await peerConnectionRef.current.setRemoteDescription(answer);
                        setCallActive(true);
                    }
                });

                sock.on("ice-candidate", async ({ candidate }) => {
                    if (peerConnectionRef.current && candidate) {
                        try { await peerConnectionRef.current.addIceCandidate(candidate); } catch (e) { console.error("Error adding ICE candidate", e); }
                    }
                });
            }).catch(err => {
                console.error("Failed to get media", err);
                toast.error("Could not access camera or microphone. Please check permissions.");
            });

        return () => {
            socketRef.current?.disconnect();
            peerConnectionRef.current?.close();
            localStream?.getTracks().forEach(track => track.stop());
        };
        // eslint-disable-next-line
    }, [meetingId]);

    async function createPeerConnection(stream, sock) {
        const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        peerConnectionRef.current = pc;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
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

    const handleEndCall = async () => {
        if (exitedRef.current) return;
        exitedRef.current = true;
        endedByMeRef.current = true;

        peerConnectionRef.current?.close();
        socketRef.current?.emit("call-ended", { meetingId, role: "mentor" });
        localStream?.getTracks().forEach(track => track.stop());

        setCallActive(false);
        setRemoteStream(null);
        peerConnectionRef.current = null;
        completeMeeting(meetingId); // Using context function
        navigate("/Mentor-Meetings");
        setTimeout(() => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        }, 500);
    };

    const timerKey = `meeting-timer-${meetingId}`;
    const micKey = `meeting-mic-${meetingId}`;
    const camKey = `meeting-cam-${meetingId}`;

    useEffect(() => {
        let startTime = localStorage.getItem(timerKey);
        if (!startTime) {
            startTime = Date.now().toString();
            localStorage.setItem(timerKey, startTime);
        }

        const applyMediaStates = (stream) => {
            const micState = localStorage.getItem(micKey);
            const camState = localStorage.getItem(camKey);
            if (micState !== null) {
                const enabled = micState === 'true';
                setMicOn(enabled);
                stream.getAudioTracks().forEach(track => track.enabled = enabled);
            }
            if (camState !== null) {
                const enabled = camState === 'true';
                setCamOn(enabled);
                stream.getVideoTracks().forEach(track => track.enabled = enabled);
            }
        }

        if (localStream) {
            applyMediaStates(localStream);
        }

        timerIntervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
            setTimer(elapsed);
        }, 1000);

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
        // eslint-disable-next-line
    }, [localStream]);
    
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
    
    function renderTimer() {
        const scheduled = 30 * 60;
        const displayTime = timer < scheduled ? scheduled - timer : timer - scheduled;
        const minutes = Math.floor(displayTime / 60).toString().padStart(2, '0');
        const seconds = (displayTime % 60).toString().padStart(2, '0');
        const isExtraTime = timer >= scheduled;

        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg transition-colors ${isExtraTime ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                <Clock size={20} />
                <span>
                    {isExtraTime && "Extra: "}
                    {minutes}:{seconds}
                </span>
            </div>
        );
    }
    
    // --- New Professional LIGHT THEME UI ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="w-full h-full max-w-7xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                {/* Header */}
                <header className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Session with {userName || 'the User'}</h1>
                    <p className="text-sm text-gray-500">Meeting ID: {meetingId}</p>
                </header>

                {/* Main Video Area */}
                <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 p-6 overflow-hidden">
                    <VideoPlayer
                        videoRef={localVideoRef}
                        stream={localStream}
                        label="Your Video"
                        isMuted={true}
                        isCamOff={!camOn}
                    />
                    <VideoPlayer
                        videoRef={remoteVideoRef}
                        stream={remoteStream}
                        label={userName || "User's Video"}
                        isWaiting={waiting}
                        isCamOff={!remoteStream}
                    />
                </main>

                {/* Controls Bar */}
                <footer className="w-full flex justify-center p-4 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-white/70 backdrop-blur-md p-3 rounded-full border border-gray-200 shadow-lg">
                        {/* Timer */}
                        {callActive && renderTimer()}

                        {/* Media Controls */}
                        <button
                            onClick={handleToggleMic}
                            className={`p-3 rounded-full transition-all duration-200 ${micOn ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
                        >
                            {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                        </button>
                        <button
                            onClick={handleToggleCam}
                            className={`p-3 rounded-full transition-all duration-200 ${camOn ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            aria-label={camOn ? "Turn off camera" : "Turn on camera"}
                        >
                            {camOn ? <Video size={24} /> : <VideoOff size={24} />}
                        </button>

                        {/* End Call Button */}
                        {callActive && (
                            <button
                                onClick={handleEndCall}
                                className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-md"
                                aria-label="End call"
                            >
                                <PhoneOff size={22} />
                                <span className="hidden sm:inline">End Call</span>
                            </button>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default MentorVideoRoom;
