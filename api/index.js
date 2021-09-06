const express = require("express");
const router = express.Router();
const userApi = require("./users");
const productsApi = require("./products");
/* GET home page. */
router.use("/users", userApi);

router.use("/products", productsApi);
module.exports = router;
