import express from "express";
import {
  getAllDeliveryZones,
  getDeliveryZoneById,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone,
} from "../controllers/DeliveryZoneController.js";

const router = express.Router();

router.get("/", getAllDeliveryZones);
router.get("/:id", getDeliveryZoneById);
router.post("/", createDeliveryZone);
router.put("/:id", updateDeliveryZone);
router.delete("/:id", deleteDeliveryZone);

export default router;
