import express from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
/* GET users listing. */

router.get("/order", authMiddleware.loginRequired, orderController.getOrder);
router.post(
  "/order/",
  authMiddleware.loginRequired,
  orderController.addToOrder
);
router.patch(
  "/order/:id",
  authMiddleware.loginRequired,
  orderController.updateOrder
);
router.delete(
  "/order/:id",
  authMiddleware.loginRequired,
  orderController.deleteOrder
);

export default router;
