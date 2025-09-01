import CartItem from "../models/CartItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// Add an item to a cart
export const addCartItem = async (cartId, productId, quantity = 1, sizeId = null, price) => {
  const item = await CartItem.create({ cartId, productId, quantity, sizeId, price });
  return item;
};

// Update cart item quantity
export const updateCartItem = async (itemId, data) => {
  const item = await CartItem.findByPk(itemId);
  if (!item) throw { status: 404, message: "Cart item not found" };
  return await item.update(data);
};

// Remove an item from a cart
export const removeCartItem = async (itemId) => {
  const item = await CartItem.findByPk(itemId);
  if (!item) throw { status: 404, message: "Cart item not found" };
  return await item.destroy();
};

// Get all items in a cart
export const getCartItems = async (cartId) => {
  return await CartItem.findAll({
    where: { cartId },
    include: ["product", "size"]
  });
};
