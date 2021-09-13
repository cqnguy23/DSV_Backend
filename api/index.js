import express from "express";
import userApi from "./users.js";
import productsApi from "./products.js";
import authApi from "./auth.js";
import orderApi from "./order.js";
/* GET home page. */
const router = express.Router();

router.use("/users", userApi);
router.use("/products", productsApi);
router.use("/auth", authApi);
router.use("/order", orderApi);
export default router;
