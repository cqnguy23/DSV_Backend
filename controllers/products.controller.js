import Product from "../models/Product.model.js";

const productsController = {};

productsController.getProducts = async (req, res, next) => {
  let { page, limit, sortBy, search } = { ...req.query };
  let gender = req.params.gender;
  sortBy = sortBy || "addedDate";
  search = search || "";
  let products = [];
  let numsTotal = 0;
  if (gender != "all") {
    try {
      //customer get
      numsTotal = await Product.find({ gender }).count();
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 20;
      const offset = limit * (page - 1);
      if (sortBy == "addedDate") {
        products = await Product.find({ gender }, { sold: false })
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit);
      } else if (sortBy == "alpha") {
        products = await Product.find({ gender }, { sold: false })
          .sort({ name: 1 })
          .skip(offset)
          .limit(limit);
      } else if (sortBy === "reverseAlpha") {
        products = await Product.find({ gender }, { sold: false })
          .sort({ name: -1 })
          .skip(offset)
          .limit(limit);
      }
    } catch (err) {
      next(err);
    }
  } else {
    try {
      //admin get
      numsTotal = await Product.find({ name: { $regex: search } }).count();
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 8;
      const offset = limit * (page - 1);
      if (sortBy == "addedDate") {
        products = await Product.find({ name: { $regex: search } })
          .sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit);
      } else if (sortBy == "alpha") {
        products = await Product.find({ name: { $regex: search } })
          .sort({ name: 1 })
          .skip(offset)
          .limit(limit);
      } else {
        products = await Product.find({ name: { $regex: search } })
          .sort({ name: -1 })
          .skip(offset)
          .limit(limit);
      }
    } catch (err) {
      next(err);
    }
  }

  return res.status(200).send({
    products: products,
    numsTotal: numsTotal,
  });
};

productsController.getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing id params!");
  try {
    let product = await Product.findById(id);
    if (!product) return res.status(404).send("Cannot find selected product.");
    const quantities = Object.values(product.size);
    const sum = quantities.reduce((prev, cur) => prev + cur, 0);
    return res.status(200).send({ product: product, quantity: sum });
  } catch (err) {
    next(err);
  }
};

productsController.editSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing id params");
  const { size } = req.body;
  console.log(req.body);
  try {
    let product = await Product.findByIdAndUpdate(id, { size }, { new: true });
    if (!product) return res.status(404).send("Cannot find selected product.");
    return res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
productsController.removeSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing id params");
  try {
    let product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send("Cannot find selected product.");
    return res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
export default productsController;
