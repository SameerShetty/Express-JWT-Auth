const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../model/userModel");
const loginUser = (req, res) => {
  res.json({ message: "Logged in " });
};

module.exports = {
  loginUser,
};
