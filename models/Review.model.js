import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    owner: {
      type: Schema.ObjectId,
      ref: "Product",
    },
    name: String,
    rating: Number,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
