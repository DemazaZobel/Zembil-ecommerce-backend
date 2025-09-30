// src/controllers/OrderController.js
import sequelize from "../config/db.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import User from "../models/User.js";
import DeliveryStaff from "../models/DeliveryStaff.js";
import DeliveryZone from "../models/DeliveryZone.js";

// -------------------------
// Create a new order
// -------------------------
export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { 
      zoneId,
      shippingAddressId, 
      totalPrice, 
      paymentStatus, 
      paymentMethod, 
      orderStatus, 
      orderItems 
    } = req.body;

    if (!orderItems || !orderItems.length) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Find the delivery zone
    const zone = await DeliveryZone.findByPk(zoneId);
    if (!zone) return res.status(404).json({ message: "Delivery zone not found" });

    // Assign a delivery staff automatically
    const staff = await DeliveryStaff.findOne({ where: { zoneId: zone.id } });
    if (!staff) return res.status(404).json({ message: "No delivery staff assigned to this zone" });

    // Create the order
    const order = await Order.create({
      userId: req.user.id,
      assignedTo: staff.id,
      shippingAddressId,
      totalPrice,
      paymentStatus,
      paymentMethod,
      orderStatus,
    }, { transaction: t });

    // Create order items
    await Promise.all(
      orderItems.map(item =>
        OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          sizeId: item.sizeId,
          quantity: item.quantity,
          price: item.price,
        }, { transaction: t })
      )
    );

    await t.commit();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    await t.rollback();
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// -------------------------
// Get all orders
// -------------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "email"] },
        {
          model: OrderItem,
          as: "items",
          include: [
            { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
            { model: Size, as: "sizeDetail", attributes: ["id", "name"] }
          ]
        },
      ],
      order: [["createdat", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

// -------------------------
// Get single order
// -------------------------
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: DeliveryStaff, as: "deliveryStaff", attributes: ["id", "name", "email"] },
        {
          model: OrderItem,
          as: "items",
          include: [
            { model: Product, as: "productDetail", attributes: ["id", "name", "price"] },
            { model: Size, as: "sizeDetail", attributes: ["id", "name"] }
          ]
        },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching order" });
  }
};

// -------------------------
// Update order
// -------------------------
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update(req.body);
    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating order" });
  }
};

// -------------------------
// Delete order
// -------------------------
export const deleteOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Delete all related order items first
    await OrderItem.destroy({ where: { orderId: order.id }, transaction: t });
    await order.destroy({ transaction: t });

    await t.commit();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error deleting order" });
  }
};
