import express from 'express';
import { loginAdmin, MeetingsAdmin, MeetingCancel, addMentor, allMentors, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/MentorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-Mentor", authAdmin, upload.single('image'), addMentor)
adminRouter.get("/Meetings", authAdmin, MeetingsAdmin)
adminRouter.post("/cancel-Meeting", authAdmin, MeetingCancel)
adminRouter.get("/all-Mentors", authAdmin, allMentors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;