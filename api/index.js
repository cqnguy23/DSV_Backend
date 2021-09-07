import express from "express";
import userApi from "./users.js";
import productsApi from "./products.js";
/* GET home page. */
const router = express.Router();

router.use("/users", userApi);

router.use("/products", productsApi);
export default router;
