import express from "express";
import productsApi from "./products.js";
import authApi from "./auth.js";
import orderApi from "./order.js";
import categoryApi from "./category.js";
import reviewApi from "./review.js";
/* GET home page. */
const router = express.Router();

router.use("/products", productsApi);
router.use("/auth", authApi);
router.use("/order", orderApi);
router.use("/category", categoryApi);
router.use("/review", reviewApi);
export default router;
