import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const Schema = mongoose.Schema;
const userSchema = Schema({
  email: String,
  username: String,
  password: String,
});
userSchema.methods.generateToken = () => {
  let token = jwt.sign({ id: this._id }, "Hello");
  return token;
};
const User = mongoose.model("User", userSchema);

export default User;
