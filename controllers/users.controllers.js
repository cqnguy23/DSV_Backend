const userController = {};

userController.get = (req, res, next) => {
  res.send({ user: "Hello" });
  next();
};

module.exports = userController;
