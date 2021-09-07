const Product = require("./models/Product.model");
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/dsv";
mongoose.connect(MONGODB_URI).then(() => {
  console.log("Mongoose connected");
});

Product.remove({}, () => {
  console.log("Delete tickets");
});
