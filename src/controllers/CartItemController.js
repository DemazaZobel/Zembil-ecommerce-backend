import CartItem from "../models/CartItem.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// Get all cart items
export const getAllCartItems = async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
      include: [
        { model: Cart, as: "cartDetail" },
        { model: Product, as: "productDetail" },
        { model: Size, as: "sizeDetail" }
      ]
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Get cart item by ID
export const getCartItemById = async (req, res, next) => {
  try {
    const item = await CartItem.findByPk(req.params.id, {
      include: [
        { model: Cart, as: "cartDetail" },
        { model: Product, as: "productDetail" },
        { model: Size, as: "sizeDetail" }
      ]
    });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Create a cart item
export const createCartItem = async (req, res, next) => {
  try {
    const { cartId, productId, sizeId, quantity, price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const item = await CartItem.create({
      cartId,
      productId,
      sizeId: sizeId || null,
      quantity,
      price
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// Update a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // cart item id
    const { quantity } = req.body;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};


// Delete a cart item
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
