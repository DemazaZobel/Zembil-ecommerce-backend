import express from "express";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/shippingAddressController.js";

const router = express.Router();

router.post("/", createAddress);       // POST /api/shippingAddress
router.get("/", getAddresses);         // GET  /api/shippingAddress
router.get("/:id", getAddressById);    // GET  /api/shippingAddress/:id
router.put("/:id", updateAddress);     // PUT  /api/shippingAddress/:id
router.delete("/:id", deleteAddress);  // DELETE /api/shippingAddress/:id

export default router;
