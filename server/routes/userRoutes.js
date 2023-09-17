const express = require("express");
const { registerUser, authUser, updateUserProfile } = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(auth, updateUserProfile);

module.exports = router;