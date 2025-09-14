// src/controllers/OrderController.js
import sequelize from "../config/db.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import DeliveryStaff from "../models/DeliveryStaff.js";
import ShippingAddress from "../models/ShippingAddress.js";

// Create a new order
export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { items, shippingAddressId } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!shippingAddressId) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Create the order
    const order = await Order.create(
      {
        userId: req.user.id, // from auth middleware
        shippingAddressId,
        totalPrice: 0, // will update after calculating
        paymentStatus: "Pending",
        orderStatus: "Processing",
      },
      { transaction: t }
    );

    // Create order items
    let total = 0;
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);

        const subtotal = product.price * item.quantity;
        total += subtotal;

        return OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          },
          { transaction: t }
        );
      })
    );

    // Update total price
    await order.update({ totalPrice: total }, { transaction: t });

    await t.commit();
    res.status(201).json({
      message: "Order created successfully",
      order,
      orderItems,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "email"] },
        { model: ShippingAddress, as: "shippingAddress" },
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product", attributes: ["id", "name", "price"] }],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "email"] },
        { model: ShippingAddress, as: "shippingAddress" },
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product", attributes: ["id", "name", "price"] }],
        },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error fetching order" });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update(req.body);
    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error updating order" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await OrderItem.destroy({ where: { orderId: order.id }, transaction: t });
    await order.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error deleting order" });
  }
};
