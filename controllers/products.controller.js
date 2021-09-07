const Product = require("../models/Product.model");

const productsController = {};

productsController.getAllProducts = async (req, res, next) => {
  let { page, limit } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const offset = limit * (page - 1);
  const totalCount = await Product.find({}).count();
  const products = await Product.find({}).skip(offset).limit(limit);
  res.status(200).send({
    products: products,
    numsTotal: totalCount,
  });
};

productsController.getSingleProduct = async (req, res, next) => {
  let id = req.params.id;
  if (!id) res.status(400).send("Missing id params!");
  try {
    const product = await Product.findById(id);
    if (!product) res.status(404).send("Cannot find product with given ID!");
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

module.exports = productsController;
