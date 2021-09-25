import express from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
/* GET users listing. */

router.get("/", authMiddleware.adminRequired, orderController.getOrders);
router.get("/all", authMiddleware.adminRequired, orderController.getAllOrders);
router.post("/", authMiddleware.loginRequired, orderController.addToOrder);
router.patch("/:id", authMiddleware.adminRequired, orderController.updateOrder);
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  orderController.deleteOrder
);

export default router;
