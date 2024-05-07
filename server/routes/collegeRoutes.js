const express = require("express");
const router = express.Router();
const { addCollege } = require("../controllers/collegeControllers");
const { auth, isAdmin } = require("../middleware/auth");

router.route("/addCollege").post(auth, isAdmin, addCollege);

module.exports = router;
