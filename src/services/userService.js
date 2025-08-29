import User from "../models/User.js";
import ShippingAddress from "../models/ShippingAddress.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";

class UserService {
  // Create a new user
  async createUser(data) {
    const user = await User.create(data);
    return user;
  }

  // Get all users
  async getAllUsers() {
    return await User.findAll({ include: ["addresses", "orders", "reviews", "cart"] });
  }

  // Get user by ID
  async getUserById(id) {
    return await User.findByPk(id, { include: ["addresses", "orders", "reviews", "cart"] });
  }

  // Update user info
  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.update(data);
  }

  // Delete user
  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.destroy();
  }

  // Fetch user cart
  async getUserCart(userId) {
    return await Cart.findOne({ where: { userId }, include: ["items"] });
  }
}

export default new UserService();
