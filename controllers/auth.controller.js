import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
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
};

export default authController;
