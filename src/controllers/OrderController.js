// src/controllers/orderController.js
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

// Create a new order
export const createOrder = async (req, res, next) => {
  try {
    const { items, address } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "No items provided" });

    const order = await Order.create({ userId: req.user.id, address });

    // Save order items
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return OrderItem.create({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      })
    );

    res.status(201).json({ message: "Order created successfully", order, orderItems });
  } catch (error) {
    next(error);
  }
};

// Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, include: Product }]
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get single order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, include: Product }]
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Update order (e.g., change status or address)
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update(req.body); // update fields like address, orderStatus, paymentStatus
    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};

// Delete order and its items
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Delete associated order items first
    await OrderItem.destroy({ where: { orderId: order.id } });

    // Delete the order
    await order.destroy();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
