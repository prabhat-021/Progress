const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");
const { makeAdmin, removeAdmin, showAdmin, setFeatured } = require("../controllers/adminControllers");

const router = express.Router();

// ADMIN MANGEMENT 
router.route("/makeAdmin").patch(auth, isAdmin, makeAdmin);
router.route("/removeAdmin").patch(auth, isAdmin, removeAdmin);
router.route("/showAdmin").get(auth, isAdmin, showAdmin);

// College/Courses RECORDS
router.route("/featured").patch(auth, isAdmin, setFeatured);

module.exports = router;