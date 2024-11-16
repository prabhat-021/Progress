const express = require("express");
const router = express.Router();
const {addCollege}=require("../controllers/collegeControllers")

router.route("/addCollege").post(addCollege);

module.exports = router;
