const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [1, ""],
  },
  password: {
    type: String,
    required: [1, ""],
  },
});

module.exports = mongoose.model("User", userSchema);
