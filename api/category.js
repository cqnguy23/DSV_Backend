import express from "express";
import categoryController from "../controllers/category.controller.js";
const router = express.Router();

router.get("/:gender", categoryController.getCategoriesByGender);

export default router;
