const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

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

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // if (req.body.password) {
        //     user.password = req.body.password;
        // }
        // if (user.email !== email) {
        //     const userExists = await User.findOne({ email })
        //     if (userExists) {
        //         res.status(400)
        //         throw new Error("User Email Already Exists")
        //     }
        //     user.email = email
        // }
        // const upadteUser = {
        //     name: req.body.name || user.name,
        //     pic: req.body.pic || user.pic,
        //     email: user.email,
        //     password: user.password
        // }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const upadteUser = await user.save();
        // try {

        //     await User.findByIdAndUpdate(req.user._id, upadteUser);
        //     res.status(200).json(upadteUser);

        // } catch (error) {

        //     console.log(error);
        //     res.status(500).json({ message: "Something went Wrong" });

        // }

        res.json({
            _id: upadteUser._id,
            name: upadteUser.name,
            email: upadteUser.email,
            pic: upadteUser.pic,
            token: generateToken(upadteUser._id)
        });

    } else {
        return res.status(404).json({ message: "User Not Found" });
    }
});

module.exports = { registerUser, authUser, updateUserProfile };