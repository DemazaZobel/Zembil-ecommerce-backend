import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/CartController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.delete("/:id", verifyToken, removeFromCart);

export default router;
