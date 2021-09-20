import mongoose from "mongoose";
import Product from "./Product.model.js";
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    owner: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "Product",
        },
        orderedQuantity: Number,
        orderedSize: String,
        totalPrice: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.post("save", async function () {
  try {
    const products = this.products;
    for (const product of products) {
      const key = "size." + product.orderedSize;
      await Product.findByIdAndUpdate(
        product.product,
        {
          $inc: {
            sold: product.orderedQuantity,
            [key]: -1 * product.orderedQuantity,
          },
        },
        { new: true }
      );
    }
  } catch (err) {
    console.log(err);
  }
});
const Order = mongoose.model("Order", orderSchema);

export default Order;
