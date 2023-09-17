const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
    try {

        let token = req.headers.authorization;

        if (token) {
            token = token.split(" ")[1];
            let userID = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(userID.id).select("-password");
        } else {
            res.status(401).json({ message: "Unauthorized User" })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User 1" })
    }
})

module.exports = auth;