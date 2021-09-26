import mongoose from "mongoose";
import Product from "./Product.model.js";
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    owner: {
      type: Schema.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    title: String,
    rating: { type: Number, required: true },
    content: String,
  },
  {
    timestamps: true,
  }
);
reviewSchema.post("save", async function () {
  try {
    const product = await Product.findById(this.owner).populate("reviewsID");
    let avgRating = 0;
    let sumRating = 0;
    for (const review of product.reviewsID) {
      sumRating += review.rating;
    }
    sumRating += this.rating;
    avgRating = sumRating / (product.reviewsID.length + 1);
    console.log(avgRating);
    const updatedProduct = await Product.findByIdAndUpdate(
      this.owner,
      {
        rating: avgRating,
        $push: { reviewsID: this._id },
      },
      { new: true }
    );
    console.log(updatedProduct);
  } catch (err) {
    console.log(err);
  }
});
const Review = mongoose.model("Review", reviewSchema);

export default Review;
