const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../model/userModel");

// const registerUser = async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     res.status(400).json({ message: "Invalid credentials" });
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hpswd = await bcrypt.hash(password, salt);

//   const user = await User.create({
//     username,
//     password: hpswd,
//   });
//   if (user) {
//     res.status(200).json({ message: "Registered successfully" });
//   }
// };

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).json({ username: user.name, token: genToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const genToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};
module.exports = {
  loginUser,
};
