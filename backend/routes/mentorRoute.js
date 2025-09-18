import express from 'express';
import { loginMentor, MeetingsMentor, MeetingCancel, MentorList, changeAvailablity, MeetingComplete, MentorDashboard, MentorProfile, updateMentorProfile, CollegeList } from '../controllers/mentorController.js';
import authMentor from '../middleware/authMentor.js';
const MentorRouter = express.Router();

MentorRouter.post("/login", loginMentor);
MentorRouter.patch("/cancel-Meeting", authMentor, MeetingCancel); 
MentorRouter.get("/Meetings", authMentor, MeetingsMentor);
MentorRouter.get("/list", MentorList);
MentorRouter.get("/CollegeList", CollegeList);
MentorRouter.patch("/change-availability", authMentor, changeAvailablity); 
MentorRouter.patch("/complete-Meeting", authMentor, MeetingComplete); 
MentorRouter.get("/dashboard", authMentor, MentorDashboard);
MentorRouter.get("/profile", authMentor, MentorProfile);
MentorRouter.patch("/update-profile", authMentor, updateMentorProfile); 

export default MentorRouter;
