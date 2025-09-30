// middleware/staffAuthMiddleware.js
import jwt from "jsonwebtoken";
import DeliveryStaff from "../models/DeliveryStaff.js"; // your staff model

export const verifyStaffToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const staff = await DeliveryStaff.findByPk(decoded.id);
    if (!staff) return res.status(401).json({ message: "Invalid token" });

    req.staff = staff; // attach staff info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Optional: verify admin role among staff
export const verifyStaffAdmin = (req, res, next) => {
  if (!req.staff || req.staff.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
