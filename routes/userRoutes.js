const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/userController");

router.post("/", loginUser);

module.exports = router;
