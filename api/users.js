import express from "express";
import userController from "../controllers/users.controller.js";
const router = express.Router();
/* GET users listing. */

router.get("/", userController.get);

export default router;
