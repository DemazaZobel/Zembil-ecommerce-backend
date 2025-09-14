// import User from "../models/User.js";

// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.findAll({ attributes: { exclude: ["password"] } });
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUserById = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUser = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.update(req.body);
//     res.json({ message: "User updated successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.destroy();
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };


import User from "../models/User.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(req.body);
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy(); // sets deletedAt timestamp
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
