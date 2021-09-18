import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
//generatePwd
userSchema.post("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const encodedPwd = await bcrypt.hash(this.password, salt);

  await User.findByIdAndUpdate(this, {
    password: encodedPwd,
  });
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};
userSchema.methods.generateAdminToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, ADMIN_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
const User = mongoose.model("User", userSchema);

export default User;
