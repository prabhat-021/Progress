const express = require("express");
const { resetPassword, registerUser, authUser, verifyEmail, forgetPassword } = require("../controllers/userControllers.js");
const auth = require("../middleware/auth.js");
const isResetTokenValid = require("../middleware/user.js");
const { validateUser, validate } = require("../middleware/validator.js");

const router = express.Router();

router.route("/register").post(validateUser, validate, registerUser);
router.route("/login").post(authUser);
router.route("/verifyEmail").post(verifyEmail);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword").post(isResetTokenValid, resetPassword);
// router.route("/profile").post(auth, updateUserProfile);

module.exports = router;