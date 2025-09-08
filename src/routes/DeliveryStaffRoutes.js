import express from "express";
import {
  getAllDeliveryStaff,
  getDeliveryStaffById,
  createDeliveryStaff,
  updateDeliveryStaff,
  deleteDeliveryStaff,
} from "../controllers/DeliveryStaffController.js";

import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllDeliveryStaff);
router.get("/:id", verifyToken, getDeliveryStaffById);
router.post("/", verifyToken, verifyAdmin, createDeliveryStaff);
router.put("/:id", verifyToken, verifyAdmin, updateDeliveryStaff);
router.delete("/:id", verifyToken, verifyAdmin, deleteDeliveryStaff);

export default router;
