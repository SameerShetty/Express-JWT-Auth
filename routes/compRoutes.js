const express = require("express");
const router = express.Router();
const { getComp } = require("../controller/compController");
const { proctect } = require("../middleware/auth");

router.get("/", proctect, getComp);

module.exports = router;
