import express from "express";
import {
  getAllShippingAddresses,
  getShippingAddressById,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from "../controllers/shippingAddressController.js";

const router = express.Router();

router.get("/", getAllShippingAddresses);
router.get("/:id", getShippingAddressById);
router.post("/", createShippingAddress);
router.put("/:id", updateShippingAddress);
router.delete("/:id", deleteShippingAddress);

export default router;
