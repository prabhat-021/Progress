const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // For dev only! Restrict in production.
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join", ({ meetingId, role }) => {
    socket.join(meetingId);
    if (!rooms[meetingId]) rooms[meetingId] = {};
    rooms[meetingId][role] = socket.id;
  });

  socket.on("ready", ({ meetingId }) => {
    socket.to(meetingId).emit("ready", { meetingId });
  });

  socket.on("mentor-ready", ({ meetingId }) => {
    socket.to(meetingId).emit("mentor-ready", { meetingId });
  });

  socket.on("offer", ({ meetingId, offer }) => {
    socket.to(meetingId).emit("offer", { offer });
  });

  socket.on("answer", ({ meetingId, answer }) => {
    socket.to(meetingId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ meetingId, candidate }) => {
    socket.to(meetingId).emit("ice-candidate", { candidate });
  });

  socket.on("call-ended", ({ meetingId, role }) => {
    // console.log(`[Signaling] call-ended received for meetingId: ${meetingId} from socket ${socket.id}`);
    socket.to(meetingId).emit("call-ended", { meetingId, role });
    // console.log(`[Signaling] call-ended broadcasted to room: ${meetingId}`);
  });

  socket.on("disconnect", () => {
    // Optionally handle cleanup
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signaling server running on port ${PORT}`);
});
