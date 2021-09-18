import mongoose from "mongoose";
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
