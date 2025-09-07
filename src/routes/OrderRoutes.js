import express from "express";
import { createOrder, getAllOrders, getOrderById,   updateOrder, 
  deleteOrder } from "../controllers/OrderController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);           // Create order by user
router.get("/",verifyToken, verifyAdmin, getAllOrders); // Admin can see all orders
router.get("/:id", getOrderById);  // User or Admin can see order details
router.put("/:id", updateOrder);  
router.delete("/:id", deleteOrder);
   

export default router;
