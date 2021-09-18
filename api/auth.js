import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
/* GET users listing. */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/admin/login", authController.adminLogin);
router.post("/logout", authController.logout);

export default router;
