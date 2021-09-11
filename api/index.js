import express from "express";
import userApi from "./users.js";
import productsApi from "./products.js";
import authApi from "./auth.js";
import cartApi from "./cart.js";
/* GET home page. */
const router = express.Router();

router.use("/users", userApi);
router.use("/products", productsApi);
router.use("/auth", authApi);
router.use("/cart", cartApi);
export default router;
