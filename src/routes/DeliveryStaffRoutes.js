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

router.get("/",  getAllDeliveryStaff);
router.get("/:id", verifyToken, getDeliveryStaffById);
router.post("/", createDeliveryStaff);
router.put("/:id",  updateDeliveryStaff);
router.delete("/:id", deleteDeliveryStaff);

export default router;
