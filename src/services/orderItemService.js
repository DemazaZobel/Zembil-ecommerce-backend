import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import Order from "../models/Order.js";

// Add an item to an order
export const addOrderItem = async (orderId, productId, quantity = 1, sizeId = null, price) => {
  const item = await OrderItem.create({ orderId, productId, quantity, sizeId, price });
  return item;
};

// Update an order item
export const updateOrderItem = async (itemId, data) => {
  const item = await OrderItem.findByPk(itemId);
  if (!item) throw { status: 404, message: "Order item not found" };
  return await item.update(data);
};

// Remove an item from an order
export const removeOrderItem = async (itemId) => {
  const item = await OrderItem.findByPk(itemId);
  if (!item) throw { status: 404, message: "Order item not found" };
  return await item.destroy();
};

// Get all items in an order
export const getOrderItems = async (orderId) => {
  return await OrderItem.findAll({
    where: { orderId },
    include: ["product", "size"]
  });
};
