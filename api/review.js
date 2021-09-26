import express from "express";
import reviewController from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.reviewRequired,
  reviewController.postReview
);

export default router;
