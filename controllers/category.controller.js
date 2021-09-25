import Category from "../models/Category.model.js";

const categoryController = {};

categoryController.getCategoriesByGender = async (req, res, next) => {
  let gender = req.params.gender;
  gender = gender || "";
  try {
    let category;
    if (gender === "all") {
      category = await Category.find({});
    } else {
      category = await Category.find({ gender: gender });
    }
    let otherIdx = category.length - 1;
    category.forEach((cate, idx) => {
      if (cate.name === "Other") otherIdx = idx;
    });
    category.push(category.splice(otherIdx, 1)[0]); //Put Other category at end of array
    return res.status(200).send(category);
  } catch (err) {
    return next(err);
  }
};

export default categoryController;
