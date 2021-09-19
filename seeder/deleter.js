import Product from "../models/Product.model.js";
import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/dsv";
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
});

Product.remove({}, () => {
  console.log("Delete products");
});
