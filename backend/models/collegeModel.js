import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: String, required: true },
    fees: { type: Number, required: true },
    appFees: { type: Number, required: true },
    about: { type: String, required: true },
    speciality: { type: String, required: true },
    address: { type: Object, required: true },
    star: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    studentFacultyRatio: { type: String, required: true },
    image: { type: String, required: true, default: "https://res.cloudinary.com/prabhat021/image/upload/v1749916864/OIP_uu8lcl.jpg" }
});

const CollegeModel = mongoose.model("NewCollege", collegeSchema);
export default CollegeModel;
