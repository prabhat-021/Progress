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

  socket.on("disconnect", () => {
    // Optionally handle cleanup
  });
});

server.listen(5000, () => {
  console.log("Signaling server running on port 5000");
});
