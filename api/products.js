import express from "express";
import productsController from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/gender/:gender", productsController.getProducts);
router.get(
  "/admin",
  authMiddleware.adminRequired,
  productsController.getProductsAdmin
);
router.get(
  "/admin/all",
  authMiddleware.adminRequired,
  productsController.getAllProductsAdmin
);
router.get("/:id", productsController.getSingleProduct);
router.post(
  "/",
  authMiddleware.adminRequired,
  productsController.addSingleProduct
);
router.patch(
  "/:id",
  authMiddleware.adminRequired,
  productsController.editSingleProduct
);
router.delete(
  "/:id",
  authMiddleware.adminRequired,
  productsController.removeSingleProduct
);

export default router;
