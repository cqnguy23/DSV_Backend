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
    if (!product) res.status(404).send("Cannot find selected product.");
    const quantities = Object.values(product.size);
    const sum = quantities.reduce((prev, cur) => prev + cur, 0);
    res.status(200).send({ product: product, quantity: sum });
  } catch (err) {
    next(err);
  }
};

export default productsController;
