import CartItem from "../models/CartItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

export const getAllCartItems = async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
      include: [
        { model: Cart, as: "cart" },
        { model: Product, as: "product" },
        { model: Size, as: "size" }
      ]
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getCartItemById = async (req, res, next) => {
  try {
    const item = await CartItem.findByPk(req.params.id, {
      include: [
        { model: Cart, as: "cart" },
        { model: Product, as: "product" },
        { model: Size, as: "size" }
      ]
    });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    await item.update(req.body);
    res.json({ message: "Cart item updated", item });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    await item.destroy();
    res.json({ message: "Cart item deleted" });
  } catch (error) {
    next(error);
  }
};
