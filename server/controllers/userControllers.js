// const  = require("express-async-handler");
const User = require("../models/userData.js");
const VerificationToken = require("../models/verificationTokenschema.js");
const ResetToken = require("../models/resetToken.js");
const generateToken = require("../utils/generateToken.js");
const { generateOTP, transporter, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail.js");
const { isValidObjectId } = require("mongoose");
const crypto = require("crypto");

const registerUser = async (req, res) => {
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

};

const authUser = async (req, res) => {
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

};

const verifyEmail = async (req, res) => {
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
        return res.status(404).json({ message: "OTP Is Wrong" });
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

};

const forgetPassword = async (req, res) => {

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

};

const resetPassword = async (req, res) => {
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
};

const updateProfile = async (req, res) => {
    
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found, Invalid request" });
        };

        user.name = req.body.name || user.name;
        user.pic = req.body.pic || user.pic;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
};

module.exports = { registerUser, authUser, verifyEmail, forgetPassword, resetPassword, updateProfile };
