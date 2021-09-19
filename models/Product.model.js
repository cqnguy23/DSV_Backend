import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    size: { s: Number, m: Number, l: Number },
    gender: {
      type: String,
      enum: ["men", "women", "boys", "girls"],
    },
    imgURL: [String],
    category: String,
    brand: String,
    price: Number,
    sold: { type: Number, default: 0 },
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
        "Other",
      ],
      default: "Other",
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

export default Product;
