const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/userController");
const { proctect } = require("../middleware/auth");

router.post("/", loginUser);
router.post("/dboard", proctect, dboard);

module.exports = router;
