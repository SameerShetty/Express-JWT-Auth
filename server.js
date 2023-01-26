require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const connectDb = require("./db/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/story", require("./routes/storyRoutes"));

connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Server is up and running on the port ${port}`.magenta.underline.bold
      )
    );
  })
  .catch((err) => console.log(err));
