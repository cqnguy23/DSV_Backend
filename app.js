const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const indexRouter = require("./api/index");
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
console.log(MONGODB_URI);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MONGODB");
});

app.use("/api", indexRouter);

module.exports = app;
