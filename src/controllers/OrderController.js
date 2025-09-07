// src/controllers/OrderController.js
import sequelize from "../config/db.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

// Create a new order
export const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { items, address } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items provided" });
    }

    // Create the order
    const order = await Order.create(
      { userId: req.user.id, address },
      { transaction: t }
    );

    // Create order items
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);

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

    await t.commit();
    res.status(201).json({ message: "Order created successfully", order, orderItems });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items", // must match your Order.hasMany(OrderItem, { as: "items" })
          include: [{ model: Product, as: "product" }], // must match OrderItem.belongsTo(Product, { as: "product" })
        },
      ],
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
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Update order
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update(req.body);
    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    next(error);
  }
};

// Delete order
export const deleteOrder = async (req, res, next) => {
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
    next(error);
  }
};
