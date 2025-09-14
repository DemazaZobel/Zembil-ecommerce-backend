// import express from "express";
// import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
// import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // router.get("/", verifyToken, verifyAdmin, getAllUsers);
// router.get("/", getAllUsers);

// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// export default router;
// // import express from "express";
// // import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/userController.js";

// // const router = express.Router();

// // router.get("/", getAllUsers);         // Get all users
// // router.get("/:id", getUserById);      // Get user by ID
// // router.post("/", addUser);            // Add new user
// // router.put("/:id", updateUser);       // Edit user
// // router.delete("/:id", deleteUser);    // Soft delete user

// // export default router;

import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);         // Get all users
router.get("/:id", getUserById);      // Get user by ID
router.put("/:id", updateUser);       // Update user
router.delete("/:id", deleteUser);    // Soft delete user

export default router;
