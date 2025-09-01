import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// Create a new cart for a user
export const createCart = async (userId) => {
  const cart = await Cart.create({ userId });
  return cart;
};

// Get a user's cart
export const getCartByUserId = async (userId) => {
  return await Cart.findOne({
    where: { userId },
    include: [
      {
        association: "items",
        include: ["product", "size"],
      },
    ],
  });
};

// Delete a cart
export const deleteCart = async (cartId) => {
  const cart = await Cart.findByPk(cartId);
  if (!cart) throw { status: 404, message: "Cart not found" };
  return await cart.destroy();
};
