const asyncHandler = require("express-async-handler");
const { Course } = require("../models/colleges");
const { mongoose } = require("mongoose");

const addCourse = asyncHandler(async (req, res) => {

    try {
        const { name, code, description, information, domain, credits } = req.body;

        if (!name || !code || !description || !information || !domain || !credits) {
            return res.status(400).json({ message: "Provide all required details for Course creation" });
        }

        const course = req.body;
        const courseExist = await Course.findOne({ code });

        if (courseExist) {
            return res.status(400).json({ message: "Course already exists" });
        };

        const author = req.user.name;
        const newCourse = new Course({ ...course, author });

        await newCourse.save();
        res.status(201).json(newCourse);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

});

module.exports = { addCourse }