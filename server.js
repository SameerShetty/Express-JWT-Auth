require("dotenv").config();
const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is up and running on the port ${port}`)
);
