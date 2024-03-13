const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers.js");
const auth = require("../middleware/auth.js");
const { validateUser, validate } = require("../middleware/validator.js");

const router = express.Router();

router.route("/register").post(validateUser, validate, registerUser);
router.route("/login").post(authUser);
// router.route("/profile").post(auth, updateUserProfile);

module.exports = router;