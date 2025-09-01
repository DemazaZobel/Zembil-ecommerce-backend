// src/routes/CategoryRoutes.js
import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";

const router = express.Router();

// Routes
router.get("/", getAllCategories);          // Get all categories
router.get("/:id", getCategoryById);       // Get category by ID
router.post("/", createCategory);          // Create new category
router.put("/:id", updateCategory);        // Update category
router.delete("/:id", deleteCategory);     // Delete category

export default router;
