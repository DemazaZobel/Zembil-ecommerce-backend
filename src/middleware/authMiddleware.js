
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user; // <-- attach user to req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


// ✅ Middleware to verify admin role
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

