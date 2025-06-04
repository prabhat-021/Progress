import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import MentorRouter from "./routes/mentorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cookieParser from 'cookie-parser';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

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
    origin: allowedOrigins,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use(cookieParser());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/Mentor", MentorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
