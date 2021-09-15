import express from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();
/* GET users listing. */

router.get("/", authMiddleware.loginRequired, orderController.getOrder);
router.post("/", authMiddleware.loginRequired, orderController.addToOrder);
router.patch("/:id", authMiddleware.loginRequired, orderController.updateOrder);
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  orderController.deleteOrder
);

export default router;
