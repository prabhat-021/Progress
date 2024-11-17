import express from 'express';
import { loginMentor, MeetingsMentor, MeetingCancel, MentorList, changeAvailablity, MeetingComplete, MentorDashboard, MentorProfile, updateMentorProfile } from '../controllers/MentorController.js';
import authMentor from '../middleware/authMentor.js';
const MentorRouter = express.Router();

MentorRouter.post("/login", loginMentor)
MentorRouter.post("/cancel-Meeting", authMentor, MeetingCancel)
MentorRouter.get("/Meetings", authMentor, MeetingsMentor)
MentorRouter.get("/list", MentorList)
MentorRouter.post("/change-availability", authMentor, changeAvailablity)
MentorRouter.post("/complete-Meeting", authMentor, MeetingComplete)
MentorRouter.get("/dashboard", authMentor, MentorDashboard)
MentorRouter.get("/profile", authMentor, MentorProfile)
MentorRouter.post("/update-profile", authMentor, updateMentorProfile)

export default MentorRouter;