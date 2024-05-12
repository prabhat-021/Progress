const User = require("../models/userData");
const { College, Course } = require("../models/colleges");

const makeAdmin = async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.verified) {
            return res.status(400).json({ message: "User is not Verified" });
        }

        if (user.isAdmin) {
            return res.status(400).json({ message: "User is Already Admin" });
        }

        user.isAdmin = true;

        await user.save();

        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const removeAdmin = async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user === req.user.email) {
            return res.status(404).json({ message: "Cant remove You own" });
        }

        if (!user.isAdmin) {
            return res.status(400).json({ message: "User is Not a Admin" });
        }

        user.isAdmin = false;

        await user.save();

        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const showAdmin = async (req, res) => {

    try {
        const users = await User.find({ isAdmin: true });

        res.status(200).json(users);
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const setFeatured = async (req, res) => {

    try {
        const { email } = req.body;

        const college = await College.findOne({ email });

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        if (!college.verified) {
            college.verified = true;
        }

        if (college.featured) {
            return res.status(400).json({ message: "College is Already Featured" });
        }

        college.featured = true;

        await college.save();

        res.status(200).json(college);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const removeFeatured = async (req, res) => {

    try {
        const { email } = req.body;

        const college = await College.findOne({ email });

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        if (!college.featured) {
            return res.status(400).json({ message: "College is Not Featured" });
        }

        college.featured = false;

        await college.save();

        res.status(200).json(college);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const addCourse = async (req, res) => {
    try {
        const { code, email } = req.body;

        const course = await Course.findOne({ code });

        if (!course) {
            return res.status(400).json({ message: "Course not found" });
        }

        const college = await College.findOne({ email });

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        if (college.courses.includes(course._id)) {
            return res.status(400).json({ message: "Course Already Present" });
        }

        college.courses.push(course._id);

        await college.save();

        res.status(200).json(college);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { makeAdmin, removeAdmin, showAdmin, setFeatured, removeFeatured , addCourse};
