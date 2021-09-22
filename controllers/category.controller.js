import Category from "../models/Category.model.js";

const categoryController = {};

categoryController.getCategories = async (req, res, next) => {
  try {
    const category = await Category.find({});
    return res.status(200).send(category);
  } catch (err) {
    return next(err);
  }
};

export default categoryController;
