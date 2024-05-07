const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { addCourse } = require("../controllers/courseControllers");

router.route("/addCourse").post(auth, isAdmin, addCourse);


module.exports = router;
