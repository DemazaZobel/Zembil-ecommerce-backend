// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.id);
//     if (!user) return res.status(401).json({ message: "Invalid token" });
//     req.user = user; // attach user to request
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized", error: err.message });
//   }
// };
import jwt from "jsonwebtoken";

// ✅ Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) return res.status(401).json({ message: "Invalid token" });

    // Attach user info to req.user
    req.user = { id: decoded.id, role: decoded.role }; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

// ✅ Middleware to verify admin role
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

