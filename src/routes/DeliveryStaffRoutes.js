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

router.get("/",  getAllDeliveryStaff);
router.get("/:id", getDeliveryStaffById);
router.post("/",  createDeliveryStaff);
router.put("/:id", updateDeliveryStaff);
router.delete("/:id", verifyToken, verifyAdmin, deleteDeliveryStaff);
router.post("/login", loginDeliveryStaff);

export default router;
