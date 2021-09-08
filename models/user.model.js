import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const SECRET_KEY = process.env.SECRET_KEY;
const Schema = mongoose.Schema;
const userSchema = Schema({
  email: String,
  name: String,
  balance: { type: Number, default: 0 },
  password: String,
  role: {
    type: String,
    enum: ["seller", "customer"],
    default: "customer",
  },
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, SECRET_KEY, { expiresIn: "1d" });
  return token;
};
const User = mongoose.model("User", userSchema);

export default User;
