const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    size: {
      type: String,
      enum: ["s", "m", "l"],
      default: "m",
    },
    imgURL: String,
    category: String,
    quantity: Number,
    price: Number,
    color: {
      type: String,
      enum: [
        "Red",
        "Blue",
        "Yellow",
        "Black",
        "White",
        "Coal",
        "Pink",
        "Brown",
        "Green",
        "Grey",
      ],
      default: "black",
    },
    rating: Number,
    reviewsID: [
      {
        type: Schema.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
