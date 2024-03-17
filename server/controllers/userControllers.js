const asyncHandler = require("express-async-handler");
const User = require("../models/userData.js");
const VerificationToken = require("../models/verificationTokenschema.js");
const generateToken = require("../utils/generateToken.js");
const { generateOTP, transporter, generateEmailTemplate, plainEmailTemplate } = require("../utils/mail.js");
const { isValidObjectId } = require("mongoose");

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

        transporter().sendMail({
            from: 'prabhatsahrawat010203@gmail.com',
            to: newUser.email,
            subject: "Verify your email account",
            html: generateEmailTemplate(OTP),
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                pic: newUser.pic,
                token: generateToken(newUser._id)
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

const verifyEmail = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp.trim()) {
        return res.status(400).json({ message: "Invalid request, missing parameters!" });
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID!" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    if (user.verified) {
        return res.status(400).json({ message: "This Account is Already verified" });
    }

    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token) {
        return res.status(404).json({ message: "User Not Found" });
    }


    const isMatched = await token.matchToken(otp);

    if (!isMatched) {
        return res.status(404).json({ message: "Password Is Wrong" });
    }

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);

    await user.save();

    transporter().sendMail({
        from: 'prabhatsahrawat010203@gmail.com',
        to: user.email,
        subject: "Verify your email account",
        html: plainEmailTemplate("Email Verified Succesfully", "Thanks for connecting with us "),
    });

    res.status(201).json({ success: true, message: "Your Email is Verified" })

});

module.exports = { registerUser, authUser, verifyEmail };