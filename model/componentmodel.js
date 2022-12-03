const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: [1, ""],
  },
  desc: {
    type: String,
    required: [1, ""],
  },
  stock: {
    type: Number,
    required: [1, ""],
    min: 0,
  },
});

module.exports = mongoose.model("comp", componentSchema);
