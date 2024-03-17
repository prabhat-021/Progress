const asyncHandler = require("express-async-handler");
const User = require("../models/userData.js");
const VerificationToken = require("../models/verificationTokenschema.js");
const generateToken = require("../utils/generateToken.js");
const { generateOTP } = require("../utils/mail.js");

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password || !pic) {
            return res.status(400).json({ message: "Provide All Details" });
        };

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        };

        const newUser = new User({
            name, email, password, pic
        })

        const OTP = generateOTP();
        const verificationToken = new VerificationToken({
            owner: newUser._id,
            token: OTP,
        })

        await verificationToken.save();
        await newUser.save();

        if (newUser) {
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

        const isMatched = await user.matchPassword(password);

        if (!isMatched) {
            return res.status(404).json({ message: "Password Is Wrong" });
        }

        if (user && isMatched) {
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
        res.status(500).json("Something went wrong");
    }


});

module.exports = { registerUser, authUser };