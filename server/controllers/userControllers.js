const asyncHandler = require("express-async-handler");
const User = require("../models/userData.js");
const VerificationToken = require("../models/verificationTokenschema.js");
const ResetToken = require("../models/resetToken.js");
const generateToken = require("../utils/generateToken.js");
const { generateOTP, transporter, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail.js");
// const { isValidObjectId } = require("mongoose");
// const mongoose = require('mongoose');
const crypto = require("crypto");
const client = require("../utils/redisClient.js");

// const { error } = require("console");
// const { promisify } = require('util');

const redisData = asyncHandler(async (req, res) => {

    const userData = await client.get("login");

    if (!userData) {
        return res.status(404).json({ message: "No Data In Cache" });
    }

    res.status(201).json(JSON.parse(userData));

});

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

        // const newUser = new User({
        //     name, email, password, pic
        // })
        const generateToken = () => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(24, (err, buff) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const newToken = buff.toString('hex');
                    resolve(newToken);
                });
            });
        };

        const id = await generateToken();
        // console.log(id);
        const userData = { id, name, email, password, pic };

        await client.set("login", JSON.stringify(userData));
        await client.expire("login", 3600);

        const OTP = generateOTP();
        const verificationToken = new VerificationToken({
            owner: userData.id,
            token: OTP,
        })

        await verificationToken.save();
        // await newUser.save();

        transporter().sendMail({
            from: 'prabhatsahrawat010203@gmail.com',
            to: userData.email,
            subject: "Verify your email account",
            html: generateEmailTemplate(OTP),
        });

        if (userData) {
            res.status(201).json({
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                pic: userData.pic,
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

        if (!email || !password) {
            return res.status(400).json({ message: "Provide All Details" });
        };

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (!user.verified) {
            return res.status(400).json({ message: "User Not Verified" });
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

    // console.log(userId);
    // console.log(otp);

    if (!userId || !otp) {
        return res.status(400).json({ message: "Invalid request, missing parameters!" });
    }

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({ message: "Invalid user ID!" });
    // }

    const user1 = await client.get("login");
    const user = JSON.parse(user1);
    // console.log(user);
    // console.log(user.id);
    // if (!user) {
    //     return res.status(404).json({ message: "User Not Found" });
    // }

    // if (user.verified) {
    //     return res.status(400).json({ message: "This Account is Already verified" });
    // }

    const token = await VerificationToken.findOne({ owner: userId });
    // console.log(token);

    if (!token) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const isMatched = await token.matchToken(otp);

    if (!isMatched) {
        return res.status(404).json({ message: "OTP Is Wrong" });
    }

    // user.verified = true;
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        verified: true,
    });

    await VerificationToken.findByIdAndDelete(token._id);

    await newUser.save();

    transporter().sendMail({
        from: 'prabhatsahrawat010203@gmail.com',
        to: newUser.email,
        subject: "Verify your email account",
        html: plainEmailTemplate("Email Verified Succesfully", "Thanks for connecting with us "),
    });

    // res.status(201).json({ success: true, message: "Your Email is Verified" })
    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pic: newUser.pic,
    });

});

const forgetPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;
    if (!email) {
        return res.status(404).json({ message: "Please Provide a valid email!" });
    };

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found, Invalid request" });
    };

    const token = await ResetToken.findOne({ owner: user._id });
    if (token) {
        return res.status(400).json({ message: "Only after one hour you can request for another token!" });
    };

    const generateToken = () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(30, (err, buff) => {
                if (err) {
                    reject(err);
                    return;
                }

                const newToken = buff.toString('hex');
                resolve(newToken);
            });
        });
    };

    const newToken = await generateToken();
    const resetToken = new ResetToken({ owner: user._id, token: newToken });

    await resetToken.save();

    transporter().sendMail({
        from: 'prabhatsahrawat010203@gmail.com',
        to: user.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:3000/resetPassword?token=${newToken}&id=${user._id}`),
    });

    res.status(200).json({ success: true, message: "Password reset link is sent to your email" });

});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found, Invalid request" });
    };

    const isSamePassword = await user.matchPassword(password);
    if (isSamePassword) {
        return res.status(400).json({ message: "New password must be different" });
    };

    if (password.trim().length < 8 || password.trim().length > 20) {
        return res.status(400).json({ message: "Password must be 8 to 20 characters long!" });
    }

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    transporter().sendMail({
        from: 'prabhatsahrawat010203@gmail.com',
        to: user.email,
        subject: "Password Reset Successfully",
        html: plainEmailTemplate("Password Reset Successfully", "Now you can login with new password"),
    });

    res.json({ success: true, message: "Password Reset Successfully" });

});

module.exports = { registerUser, authUser, verifyEmail, forgetPassword, resetPassword, redisData };
