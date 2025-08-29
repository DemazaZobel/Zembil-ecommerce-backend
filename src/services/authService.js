import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// Register a new user
export const registerUser = async ({ name, email, password, role = "customer", zoneId = null }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw { status: 400, message: "Email already exists" };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role, zoneId });
  return user;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw { status: 404, message: "User not found" };

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw { status: 401, message: "Invalid credentials" };

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw { status: 401, message: "Invalid or expired token" };
  }
};

// Change password
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw { status: 404, message: "User not found" };

  const validPassword = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!validPassword) throw { status: 401, message: "Old password is incorrect" };

  const passwordHash = await bcrypt.hash(newPassword, 10);
  return await user.update({ passwordHash });
};
