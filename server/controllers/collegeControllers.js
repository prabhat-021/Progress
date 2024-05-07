const asyncHandler = require("express-async-handler");
const { College } = require("../models/colleges");


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

module.exports = { addCollege }