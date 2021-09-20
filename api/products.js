import express from "express";
import productsController from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/gender/:gender", productsController.getProducts);
router.get("/:id", productsController.getSingleProduct);
router.patch(
  "/:id",
  authMiddleware.adminRequired,
  productsController.editSingleProduct
);
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  productsController.removeSingleProduct
);

export default router;
