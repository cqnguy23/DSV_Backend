import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

const productsController = {};

productsController.getProducts = async (req, res, next) => {
  let { page, limit, sortBy, search, category, size, brand, color } = {
    ...req.query,
  };
  let gender = req.params.gender;
  search = search || "";
  let products = [];
  let numsTotal = 0;
  try {
    //customer get
    sortBy = sortBy || "reversePrice";
    numsTotal = await Product.find({ gender }).count();
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;
    const offset = limit * (page - 1);
    if (sortBy == "alpha") {
      products = await Product.find({ gender }, { sold: false })
        .sort({ name: 1 })
        .populate("category");
    } else if (sortBy === "reverseAlpha") {
      products = await Product.find({ gender }, { sold: false })
        .sort({ name: -1 })
        .populate("category");
    } else if (sortBy === "price") {
      products = await Product.find({ gender }, { sold: false })
        .sort({ price: 1 })
        .populate("category");
    } else if (sortBy === "reversePrice") {
      products = await Product.find({ gender }, { sold: false })
        .sort({ price: -1 })
        .populate("category");
    }
    if (category) {
      products = products.filter((product) =>
        product.category.some((singleCategory) => {
          return singleCategory.name.includes(category);
        })
      );
    }
    if (size) {
      const sizeArr = size.split(",").filter((i) => i);
      products = products.filter((product) =>
        sizeArr.every((singleSize) => product.size[singleSize] !== 0)
      );
    }
    if (brand) {
      const brandArr = brand.split(",").filter((i) => i);
      products = products.filter((product) =>
        brandArr.some(
          (singleBrand) =>
            product.brand.toLowerCase() === singleBrand.toLowerCase()
        )
      );
    }
    if (color) {
      const colorArr = color.split(",").filter((i) => i);
      products = products.filter((product) =>
        colorArr.some(
          (singleColor) =>
            product.color.toLowerCase() === singleColor.toLowerCase()
        )
      );
    }
    numsTotal = products.length;
    products = products.slice(offset, offset + limit);
  } catch (err) {
    return next(err);
  }

  return res.status(200).send({
    products: products,
    numsTotal: numsTotal,
  });
};
productsController.getProductsAdmin = async (req, res, next) => {
  let { page, limit, sortBy, search } = { ...req.query };
  search = search || "";
  let products = [];
  let numsTotal = 0;
  try {
    //admin get
    sortBy = sortBy || "addedDate";
    numsTotal = await Product.find({ name: { $regex: search } }).count();
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 8;
    const offset = limit * (page - 1);
    if (sortBy === "addedDate") {
      products = await Product.find({ name: { $regex: search } })
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
    } else if (sortBy === "alpha") {
      products = await Product.find({ name: { $regex: search } })
        .populate("category")
        .sort({ name: 1 })
        .skip(offset)
        .limit(limit);
    } else if (sortBy === "reverseAlpha") {
      products = await Product.find({ name: { $regex: search } })
        .populate("category")
        .sort({ name: -1 })
        .skip(offset)
        .limit(limit);
    }
  } catch (err) {
    return next(err);
  }

  return res.status(200).send({
    products: products,
    numsTotal: numsTotal,
  });
};
productsController.getAllProductsAdmin = async (req, res, next) => {
  try {
    //admin get
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).send(products);
  } catch (err) {
    return next(err);
  }
};
productsController.getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing id params!");
  try {
    let product = await Product.findById(id);
    if (!product) return res.status(404).send("Cannot find selected product.");
    const quantities = Object.values(product.size);
    const sum = quantities.reduce((prev, cur) => prev + cur, 0);
    const brand = product.brand;
    const gender = product.gender;
    const similarBrandProducts = await Product.find({
      _id: { $ne: product._id },
      brand,
      gender,
    }).limit(4);
    return res
      .status(200)
      .send({ product: product, quantity: sum, similarBrandProducts });
  } catch (err) {
    next(err);
  }
};

productsController.editSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing id params");
  const { size } = req.body;
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
productsController.addSingleProduct = async (req, res, next) => {
  let {
    brand,
    category,
    color,
    gender,
    description,
    imgURL,
    name,
    price,
    quantity,
    size,
  } = req.body;
  try {
    brand = brand || "Other";
    description = description || "";
    color = color || "Other";
    category = category || ["Other"];
    if (!name || !price || !quantity || !size || !gender) {
      return res
        .status(400)
        .send("Please fill out all required fields in form.");
    }
    quantity = parseInt(quantity);
    price = parseFloat(price);
    const productSize = { s: 0, m: 0, l: 0 };
    for (const item of size) {
      productSize[item] = quantity;
    }
    const productCategories = [];
    for (const singleCategory of category) {
      const temp = await Category.findOne({ name: singleCategory });
      if (temp) productCategories.push(temp._id);
    }
    const addedProduct = await Product.create({
      brand,
      category: productCategories,
      color,
      description,
      imgURL,
      name,
      price,
      gender,
      size: productSize,
    });
    return res.status(200).send(addedProduct);
  } catch (err) {
    next(err);
  }
};
productsController.editUsingFileImport = async (req, res, next) => {
  const { products } = req.body;

  if (!products)
    return res.status(400).send("Missing products in request body");
  try {
    for (const product of products) {
      const newProduct = await Product.findByIdAndUpdate(
        { _id: product.id },
        {
          "size.s": product.s,
          "size.m": product.m,
          "size.l": product.l,
          price: product.price,
        },
        { new: true }
      );
      if (!product)
        return res.status(404).send("Cannot find selected product for update.");
    }
    const updateProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(10);
    return res.status(200).send({ products: updateProducts });
  } catch (err) {
    next(err);
  }
};
export default productsController;
