const JWT = require("jsonwebtoken");
const User = require("../model/userModel");

const proctect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
    }
  }
  if (!token) {
    res.status(401);
  }
};

module.exports = {
  proctect,
};
