const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { addCourse, commentOnCourse, updateCourse, deleteCourse, getCourseById, getCourses } = require("../controllers/courseControllers");

// ADMIN ROUTES
router.route("/addCourse").post(auth, isAdmin, addCourse);
router.delete("/:id/delete", auth, isAdmin, deleteCourse);
router.patch("/:id/update", auth, isAdmin, updateCourse);

// USER ROUTES
router.patch("/:id/comment", auth, commentOnCourse);

// PUBLIC ROUTES
router.route("/:id").get(getCourseById);
router.route("/").get(getCourses);

module.exports = router;
