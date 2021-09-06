const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
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

module.exports = User;
