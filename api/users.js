const express = require("express");
const userController = require("../controllers/users.controllers");
const router = express.Router();
/* GET users listing. */

router.get("/", userController.get);

module.exports = router;
