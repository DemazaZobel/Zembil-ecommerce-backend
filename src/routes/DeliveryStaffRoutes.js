import express from "express";
import {
  getAllDeliveryStaff,
  getDeliveryStaffById,
  createDeliveryStaff,
  updateDeliveryStaff,
  deleteDeliveryStaff,
  loginDeliveryStaff,
} from "../controllers/DeliveryStaffController.js";

import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllDeliveryStaff);
router.get("/:id", getDeliveryStaffById);
router.post("/", verifyAdmin, createDeliveryStaff);
router.put("/:id", updateDeliveryStaff);
router.delete("/:id", verifyAdmin, deleteDeliveryStaff);
router.post("/login", loginDeliveryStaff);

export default router;
