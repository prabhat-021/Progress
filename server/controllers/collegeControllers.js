const asyncHandler = require("express-async-handler");
const { College } = require("../models/colleges");
const { mongoose } = require("mongoose");


const addCollege = asyncHandler(async (req, res) => {

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

});

const updateCollege = asyncHandler(async (req, res) => {

    try {

        const { id } = req.params;
        const college = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No College With This Id");

        const updatedCollege = await College.findByIdAndUpdate(id, { ...college, id }, { new: true });
        res.json(updatedCollege);
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});

const deleteCollege = asyncHandler(async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No College With This Id");
        const deletedCollege = await College.findByIdAndDelete(id);

        res.json(deletedCollege);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});

const commentOnCollege = asyncHandler(async (req, res) => {

    try {

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = { addCollege, updateCollege, deleteCollege ,commentOnCollege};
