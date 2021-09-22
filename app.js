import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./api/index.js";
import Category from "./models/Category.model.js";

env.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
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

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  return res.status(statusCode).send(error.message);
});
export default app;
