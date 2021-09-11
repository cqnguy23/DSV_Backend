import Product from "../models/Product.model.js";

const productsController = {};

productsController.getProducts = async (req, res, next) => {
  let { page, limit } = { ...req.query };
  const gender = req.params.gender;
  const numsTotal = await Product.find({ gender }).count();
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const offset = limit * (page - 1);
  let products = await Product.find({ gender }).skip(offset).limit(limit);
  let map = new Map();
  products.forEach((product) => {
    map.set(product.name, product);
  });
  products = Array.from(map, ([name, value]) => value);
  res.status(200).send({
    products: products,
    numsTotal: numsTotal,
  });
};

productsController.getSingleProduct = async (req, res, next) => {
  let id = req.params.id;
  if (!id) res.status(400).send("Missing id params!");
  try {
    let product = await Product.findById(id);
    if (!product) res.status(404).send("Cannot find product with given ID!");

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

export default productsController;
