const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer();

const allowedOrigins = [
  'http://localhost:5173',
  'https://progress-b8v3.vercel.app',
  "https://progress-8ffa.vercel.app",
  "http://localhost:5174"
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true 
  }
});

// Authentication Middleware
io.use((socket, next) => {
  const handshake = socket.handshake;
  let token;

  // Try to get token from auth header (for mentor)
  if (handshake.auth && handshake.auth.token) {
    token = handshake.auth.token;
  } 
  // If not found, try to get token from cookies (for user)
  else if (handshake.headers.cookie) {
    const cookies = cookie.parse(handshake.headers.cookie);
    token = cookies.token;
  }

  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.decoded = decoded; 
    next();
  });
});

const rooms = {};

io.on("connection", (socket) => {
  // console.log(`[Connection] User connected: ${socket.id}`);
  
  socket.on("join", ({ meetingId, role }) => {
    // console.log(`[Join] User ${socket.id} joining meeting ${meetingId} as ${role}`);
    socket.join(meetingId);
    if (!rooms[meetingId]) rooms[meetingId] = {};
    rooms[meetingId][role] = socket.id;
  });

  socket.on("ready", ({ meetingId }) => {
    // console.log(`[Ready] User ${socket.id} is ready for meeting ${meetingId}`);
    socket.to(meetingId).emit("ready", { meetingId });
  });

  socket.on("mentor-ready", ({ meetingId }) => {
    // console.log(`[Mentor Ready] Mentor is ready for meeting ${meetingId}`);
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
    socket.to(meetingId).emit("call-ended", { meetingId, role });
  });

  socket.on("disconnect", (reason) => {
    // console.log(`[Disconnect] User ${socket.id} disconnected: ${reason}`);
    for (const meetingId in rooms) {
      for (const role in rooms[meetingId]) {
        if (rooms[meetingId][role] === socket.id) {
          delete rooms[meetingId][role];
          if (Object.keys(rooms[meetingId]).length === 0) {
            delete rooms[meetingId];
          }
          // Notify other user in the room
          socket.to(meetingId).emit("participant-left", { role });
          // console.log(`[Cleanup] Removed user ${socket.id} from meeting ${meetingId}`);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signaling server running on port ${PORT}`);
});
