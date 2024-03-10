const asyncHandler = require("express-async-handler");
const User = require("../models/userData.js");
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        };

        if (!name || !email || !password || !pic) {
            return res.status(400).json({ message: "Provide All Details" });
        };

        const user = await User.create({
            name, email, password, pic
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: "Error occoured" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }


});

const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (user && await user.matchPassword(password)) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong" );
    }


});

module.exports = { registerUser, authUser };