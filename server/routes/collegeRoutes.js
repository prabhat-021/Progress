const express = require("express");
const router = express.Router();
const { addCollege, deleteCollege, updateCollege, commentOnCollege } = require("../controllers/collegeControllers");
const { auth, isAdmin } = require("../middleware/auth");

router.route("/addCollege").post(auth, isAdmin, addCollege);
router.delete("/:id/delete", auth, isAdmin, deleteCollege);
router.patch("/:id/update", auth, isAdmin, updateCollege);
router.patch("/:id/comment",auth,commentOnCollege);

module.exports = router;
