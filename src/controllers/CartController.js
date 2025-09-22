import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// Add a product to cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, sizeId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) cart = await Cart.create({ userId: req.user.id });

    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId, sizeId: sizeId || null },
      defaults: { quantity, price: product.price },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};


// Get current user's cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          include: [
            { model: Product, as: "productDetail" },
            { model: Size, as: "sizeDetail" }
          ]
        }
      ]
    });

    if (!cart) return res.json({ message: "Cart is empty" });
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Remove an item from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Item not found in cart" });

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};
