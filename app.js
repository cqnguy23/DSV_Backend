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
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MONGODB");
});
app.get("/", (req, res, next) => {
  res.send("Welcome to DSV's Backend");
});
app.use("/api", indexRouter);

module.exports = app;
