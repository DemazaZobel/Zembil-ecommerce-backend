// src/controllers/OrderItemController.js
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import Order from "../models/Order.js";

// -------------------------
// Get all order items
// -------------------------
export const getAllOrderItems = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      include: [
        { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
        { model: Size, as: "sizeDetail", attributes: ["id", "name"] },
        { model: Order, as: "order", attributes: ["id", "totalPrice", "orderStatus"] },
      ],
      order: [["id", "DESC"]],
    });
    res.json(items);
  } catch (error) {
    console.error("Error fetching order items:", error);
    next(error);
  }
};

// -------------------------
// Get a single order item by ID
// -------------------------
export const getOrderItemById = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id, {
      include: [
        { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
        { model: Size, as: "sizeDetail", attributes: ["id", "name"] },
        { model: Order, as: "order", attributes: ["id", "totalPrice", "orderStatus"] },
      ],
    });
    if (!item) return res.status(404).json({ message: "Order item not found" });
    res.json(item);
  } catch (error) {
    console.error("Error fetching order item:", error);
    next(error);
  }
};

// -------------------------
// Create a new order item
// -------------------------
export const createOrderItem = async (req, res, next) => {
  try {
    const { orderId, productId, sizeId, quantity, price } = req.body;

    if (!orderId || !productId || !price) {
      return res.status(400).json({ message: "orderId, productId, and price are required" });
    }

    const item = await OrderItem.create({ orderId, productId, sizeId, quantity, price });
    const createdItem = await OrderItem.findByPk(item.id, {
      include: [
        { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
        { model: Size, as: "sizeDetail", attributes: ["id", "name"] },
        { model: Order, as: "order", attributes: ["id", "totalPrice", "orderStatus"] },
      ],
    });

    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error creating order item:", error);
    next(error);
  }
};

// -------------------------
// Update an order item
// -------------------------
export const updateOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Order item not found" });

    await item.update(req.body);

    const updatedItem = await OrderItem.findByPk(item.id, {
      include: [
        { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
        { model: Size, as: "sizeDetail", attributes: ["id", "name"] },
        { model: Order, as: "order", attributes: ["id", "totalPrice", "orderStatus"] },
      ],
    });

    res.json({ message: "Order item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error updating order item:", error);
    next(error);
  }
};

// -------------------------
// Delete an order item
// -------------------------
export const deleteOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Order item not found" });

    await item.destroy();
    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error("Error deleting order item:", error);
    next(error);
  }
};
