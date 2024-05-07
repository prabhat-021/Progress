const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userData.js");

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

        console.error(error);
        res.status(401).json({ message: "Unauthorized User 1" })
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    try {

        // Check if user is logged in
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, user not logged in" });
        }

        // Check if user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden, user is not an admin" });
        }

        // User is authenticated and is an admin, proceed to next middleware/route handler
        next();

    } catch (error) {

        console.error(error);
        res.status(401).json({ message: "Unauthorized User , Only Admin can access" })
    }
})

module.exports = { auth, isAdmin };