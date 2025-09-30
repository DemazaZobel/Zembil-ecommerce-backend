import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import User from "../models/User.js";
import ShippingAddress from "../models/ShippingAddress.js";
import DeliveryStaff from "../models/DeliveryStaff.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// -------------------------
// Orders
// -------------------------

// Create a new order
export const createOrder = async (data) => {
  const order = await Order.create(data);
  return order;
};

// Get all orders with full details (admin dashboard)
export const getAllOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          { model: Product, as: "productDetail" },
          { model: Size, as: "sizeDetail" },
        ],
      },
      { model: User, as: "user", attributes: ["id", "name", "email", "phone"] },
      { model: ShippingAddress, as: "shippingAddress" },
      { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "phone"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Get a single order by ID with full details
export const getOrderById = async (id) => {
  return await Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          { model: Product, as: "productDetail" },
          { model: Size, as: "sizeDetail" },
        ],
      },
      { model: User, as: "user", attributes: ["id", "name", "email", "phone"] },
      { model: ShippingAddress, as: "shippingAddress" },
      { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "phone"] },
    ],
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
  return await Order.findAll({
    where: { assignedTo: staffId },
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          { model: Product, as: "productDetail" },
          { model: Size, as: "sizeDetail" },
        ],
      },
      { model: User, as: "user", attributes: ["id", "name", "email", "phone"] },
      { model: ShippingAddress, as: "shippingAddress" },
    ],
    order: [["createdAt", "DESC"]],
  });
};