const express = require("express");
const router = express.Router();
const { addCollege, deleteCollege, updateCollege, commentOnCollege } = require("../controllers/collegeControllers");
const { auth, isAdmin } = require("../middleware/auth");

router.route("/addCollege").post(auth, isAdmin, addCollege);
router.delete("/:id", auth, isAdmin, deleteCollege);
router.patch("/:id", auth, isAdmin, updateCollege);
router.route("/:id",auth,commentOnCollege);

module.exports = router;
