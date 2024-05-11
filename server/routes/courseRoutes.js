const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { addCourse, commentOnCourse, updateCourse, deleteCourse } = require("../controllers/courseControllers");

router.route("/addCourse").post(auth, isAdmin, addCourse);
router.delete("/:id/delete", auth, isAdmin, deleteCourse);
router.patch("/:id/update", auth, isAdmin, updateCourse);
router.patch("/:id/comment", auth, commentOnCourse);


module.exports = router;
