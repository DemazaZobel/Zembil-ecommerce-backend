import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import User from "../models/User.js";
import ShippingAddress from "../models/ShippingAddress.js";
import DeliveryStaff from "../models/DeliveryStaff.js";

// Create a new order
export const createOrder = async (data) => {
  const order = await Order.create(data);
  return order;
};

// Get all orders
export const getAllOrders = async () => {
  return await Order.findAll({
    include: ["items", "user", "shippingAddress", "deliveryStaff"]
  });
};

// Get order by ID
export const getOrderById = async (id) => {
  return await Order.findByPk(id, {
    include: ["items", "user", "shippingAddress", "deliveryStaff"]
  });
};

// Update order info
export const updateOrder = async (id, data) => {
  const order = await Order.findByPk(id);
  if (!order) throw { status: 404, message: "Order not found" };
  return await order.update(data);
};

// Delete order
export const deleteOrder = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) throw { status: 404, message: "Order not found" };
  return await order.destroy();
};

// Get all orders assigned to a delivery staff
export const getOrdersByStaff = async (staffId) => {
  return await Order.findAll({ where: { assignedTo: staffId } });
};
