import express from "express";
import productsController from "../controllers/products.controller.js";
const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getSingleProduct);

export default router;
