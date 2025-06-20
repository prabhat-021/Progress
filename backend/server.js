import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import MentorRouter from "./routes/mentorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csrf from 'csurf';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares

// app.use(cors({
  //   origin: 'http://localhost:5173',
  //   credentials: true
  // }));
  
  const allowedOrigins = [
    'http://localhost:5173',
    'https://progress-b8v3.vercel.app',
    "https://progress-8ffa.vercel.app",
    "http://localhost:5174"
  ];
  
const corsOptions = {
   origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        status: 429,
        error: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use(csrfProtection);

app.get("/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/Mentor", MentorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
