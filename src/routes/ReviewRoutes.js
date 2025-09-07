import express from "express";
import { createReview, updateReview, deleteReview, getReviewsByProduct } from "../controllers/ReviewController.js";
import Review from "../models/Review.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create review
router.post("/", verifyToken, createReview);

// Update review
router.put("/:id", verifyToken, updateReview);

// Delete review
router.delete("/:id", verifyToken, deleteReview);

// Get reviews for a specific product
router.get("/product/:productId", getReviewsByProduct);

// ✅ New: Get all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

export default router;
