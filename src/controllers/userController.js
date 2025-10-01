import User from "../models/User.js";
import bcrypt from "bcrypt";


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...otherData } = req.body;
    const updateData = { ...otherData };

    // If a new password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    // Update the user with all fields including hashed password
    await user.update(updateData);

    res.json({  user });
  } catch (error) {
    next(error);
  }
};



// src/controllers/userController.js
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Skip hooks to avoid notNull validation errors
    await user.destroy({ hooks: false });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

