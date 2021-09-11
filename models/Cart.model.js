import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    owner: {
      type: Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
