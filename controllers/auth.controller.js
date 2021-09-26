import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import Token from "../models/TokenList.model.js";
const authController = {};

authController.register = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    res.status(400).send("Missing required registration field!");
  else {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send("Email already been used!");
    } else {
      try {
        user = await User.create({
          email,
          name,
          password,
        });
      } catch (err) {
        console.log(err);
        res.status(404).send(err);
      }
      const accessToken = await user.generateToken();
      delete user[password];
      res.status(200).send({ user, accessToken });
    }
  }
};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).send("Invalid email or password.");
    } else {
      const pwdMatch = await bcrypt.compare(password, user.password);
      if (!pwdMatch) return res.status(401).send("Invalid email or password.");
      const accessToken = user.generateToken();
      delete user[password];
      return res.status(200).send({ user, accessToken });
    }
  } catch (err) {
    next(err);
  }
};

authController.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).send("Invalid email or password.");
    } else {
      const pwdMatch = await bcrypt.compare(password, user.password);
      if (!pwdMatch) return res.status(401).send("Invalid email or password.");
      if (user.role != "seller") {
        return res
          .status(401)
          .send("You are not authorized to perform this action.");
      }
      const accessToken = user.generateAdminToken();
      delete user[password];
      return res.status(200).send({ user, accessToken });
    }
  } catch (err) {
    next(err);
  }
};

authController.logout = async (req, res, next) => {
  const token = req.body.token;
  if (!token)
    return res.status(400).send("Unable to log out. Please try again later.");
  try {
    const newToken = await Token.create({ token });
    await newToken.clearExpiredTokens();
    return res.status(200).send("Log out successfully.");
  } catch (err) {
    next(err);
  }
};
export default authController;
