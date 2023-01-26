const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const olduser = await User.findOne({ email });
  if (olduser) {
    res.status(401).json({ message: "User already exists !!!" });
  } else {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    if (user) {
      let token = genToken(user._id);
      res.status(200).json({ user, token });
    } else {
      console.log(error);
      res.status(401);
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(401).json({ message: "User not found !!!" });
  } else {
    if (await bcrypt.compare(password, userExists.password)) {
      let token = genToken(userExists._id);
      res.status(200).json({ userExists, token });
    } else {
      res.status(401).json({ message: "Invalid password !!!" });
    }
  }
};
const genToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

const updateUser = async (req, res) => {
  try {
    const userDetails = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const gotUser = await User.findOne({ _id: id });
  if (gotUser) res.status(200).json(gotUser).select("-password");
  else res.status(401).json({ message: "User not found !!!" });
};

const followUser = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    return res.status(200).json({ message: "Can't follow self !!!" });
  }
  try {
    const gotUser = await User.findOne({ _id: req.user._id });
    if (!gotUser.following.includes(id)) {
      await gotUser.updateOne({ $push: { following: id } });
      const followingUser = await User.findOne({ _id: id });
      await followingUser.updateOne({ $push: { follower: req.user._id } });
    } else {
      await gotUser.updateOne({ $pull: { following: id } });
      const followingUser = await User.findOne({ _id: id });
      await followingUser.updateOne({ $pull: { follower: req.user._id } });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  followUser,
  updateUser,
};
