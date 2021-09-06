const productsController = {};

productsController.getAllProducts = (req, res, next) => {
  res.status(200).send([
    {
      name: "Hello",
      size: "s",
      color: ["red"],
      quantity: 2,
    },
  ]);
};

module.exports = productsController;
