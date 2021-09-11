import express from "express";
import cartController from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
/* GET users listing. */

router.get("/cart", authMiddleware.loginRequired, cartController.getCart);
router.post("/cart/", authMiddleware.loginRequired, cartController.addToCart);
router.patch(
  "/cart/:id",
  authMiddleware.loginRequired,
  cartController.updateCart
);
router.delete(
  "/cart/:id",
  authMiddleware.loginRequired,
  cartController.deleteCart
);

export default router;
