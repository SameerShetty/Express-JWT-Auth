require("dotenv").config();
const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", require("./routes/userRoutes"));
app.use("/dboard", require("./routes/userRoutes"));

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () =>
  console.log(`Server is up and running on the port ${port}`)
);
