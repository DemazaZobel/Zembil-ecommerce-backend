import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/", getAllUsers);

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
