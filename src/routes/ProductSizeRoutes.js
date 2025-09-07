import express from "express";
import {
  getAllProductSizes,
  getProductSizeById,
  createProductSize,
  updateProductSize,
  deleteProductSize
} from "../controllers/ProductSizeController.js";

const router = express.Router();

router.get("/", getAllProductSizes);
router.get("/:id", getProductSizeById);
router.post("/", createProductSize);
router.put("/:id", updateProductSize);
router.delete("/:id", deleteProductSize);

export default router;
