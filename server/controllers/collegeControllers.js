// const asyncHandler = require("express-async-handler");
const { College } = require("../models/colleges");
const { mongoose } = require("mongoose");


const addCollege = async (req, res) => {

    try {
        const { collegeName, code, email, description, information, location, collegePhoto } = req.body;

        if (!collegeName || !code || !email || !description || !information || !location || !collegePhoto) {
            return res.status(400).json({ message: "Provide all required details for college creation" });
        }

        const college = req.body;
        const collegeExist = await College.findOne({ email });

        if (collegeExist) {
            return res.status(400).json({ message: "college already exists" });
        };

        const createdBy = req.user._id;
        const newCollege = new College({ ...college, createdBy });

        await newCollege.save();
        res.status(201).json(newCollege);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const updateCollege = async (req, res) => {

    try {

        const { id } = req.params;
        const college = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No College With This Id");

        const updatedCollege = await College.findByIdAndUpdate(id, { ...college }, { new: true });
        res.json(updatedCollege);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const deleteCollege = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No College With This Id");
        const deletedCollege = await College.findByIdAndDelete(id);

        res.json(deletedCollege);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};


const commentOnCollege = async (req, res) => {

    const { id } = req.params;
    const { value } = req.body;

    try {
        const college = await College.findById(id);

        if (!college) {
            res.status(404).json({ message: "College doesn't exist !!" });
        }
        // college.comments.content.push(value);
        const newComment = {
            user: req.user.name,
            content: value,
        };

        college.comments.push(newComment);

        const updatedCollege = await College.findByIdAndUpdate(id, college, { new: true });
        // const updatedCollege=await College.save();

        res.json(updatedCollege);
    } catch (error) {

        res.status(404).json({ message: error.message });

    }
};

const getCollegeById = async (req, res) => {

    const { id } = req.params;

    try {
        const course = await College.findById(id);

        res.status(200).json(course);
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
};

const getColleges = async (req, res) => {

    try {

        const college = await College.find();

        res.status(200).json(college);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }

};

module.exports = { addCollege, updateCollege, deleteCollege, commentOnCollege, getCollegeById ,getColleges};
