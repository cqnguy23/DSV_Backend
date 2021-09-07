const Product = require("../models/Product.model");

const productsController = {};

productsController.getAllProducts = async (req, res, next) => {
  let { page, limit } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = limit * (page - 1);
  const products = await Product.find({}).skip(offset).limit(limit);
  const totalCount = products.length;
  res.status(200).send({
    products: products,
    numsTotal: totalCount,
  });
};

module.exports = productsController;
