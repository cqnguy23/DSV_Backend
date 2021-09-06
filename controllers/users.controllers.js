const userController = {};

userController.get = (req, res, next) => {
  res.send([{ name: "Hello", completed: true }]);
};

module.exports = userController;
