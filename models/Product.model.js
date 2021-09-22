import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { s: Number, m: Number, l: Number },
    gender: {
      type: String,
      enum: ["men", "women", "boys", "girls"],
    },
    imgURL: [String],
    category: [{ type: Schema.ObjectId, ref: "Category" }],
    brand: String,
    price: Number,
    description: String,
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
