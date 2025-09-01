import OrderItem from "../models/OrderItem.js";

export const getAllOrderItems = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getOrderItemById = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "OrderItem not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "OrderItem not found" });

    await item.update(req.body);
    res.json({ message: "OrderItem updated", item });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderItem = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "OrderItem not found" });

    await item.destroy();
    res.json({ message: "OrderItem deleted" });
  } catch (error) {
    next(error);
  }
};
