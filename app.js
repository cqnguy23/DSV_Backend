import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./api/index.js";

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

export default app;
