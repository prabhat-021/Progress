const express = require("express");
const router = express.Router();
const { addCollege, deleteCollege, updateCollege, commentOnCollege, getCollegeById, getColleges } = require("../controllers/collegeControllers");
const { auth, isAdmin } = require("../middleware/auth");

// ADMIN ROUTES
router.route("/addCollege").post(auth, isAdmin, addCollege);
router.delete("/:id/delete", auth, isAdmin, deleteCollege);
router.patch("/:id/update", auth, isAdmin, updateCollege);

// USER ROUTES
router.patch("/:id/comment", auth, commentOnCollege);

// PUBLIC ROUTES
router.route("/:id").get(getCollegeById);
router.route("/").get(getColleges);

module.exports = router;
