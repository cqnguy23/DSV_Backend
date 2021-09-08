import Product from "../models/Product.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const authController = {};

authController.register = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    res.status(400).send("Missing required registration field!");
  else {
    let user = await User.findOne({ email });
    if (user) {
      console.log(user);
      res.status(400).send("Email already been used!");
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const encodedPwd = await bcrypt.hash(password, salt);
        user = await User.create({
          email,
          name,
          password: encodedPwd,
        });
      } catch (err) {
        console.log(err);
        res.status(404).send(err);
      }
      const accessToken = await user.generateToken();
      res.status(200).send({ user, accessToken });
    }
  }
};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).send("Login Failed: Wrong Password.");
  } else {
    const pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch) return res.status(404).send("Login Failed: Wrong Password.");
    const accessToken = user.generateToken();
    return res.status(200).send({ user, accessToken });
  }
};

export default authController;
