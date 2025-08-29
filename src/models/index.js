import sequelize from "../config/db.js";
import User from "./User.js";
import DeliveryStaff from "./DeliveryStaff.js";
import DeliveryZone from "./DeliveryZone.js";
import Category from "./Category.js";
import Size from "./Size.js";
import Product from "./Product.js";
import ProductSize from "./ProductSize.js";
import ShippingAddress from "./ShippingAddress.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Review from "./Review.js";
import Cart from "./Cart.js";
import CartItem from "./CartItem.js";

// ---------------------
// Users
// ---------------------

// Users ↔ ShippingAddresses
User.hasMany(ShippingAddress, { foreignKey: "userId", as: "addresses", onDelete: "CASCADE" });
ShippingAddress.belongsTo(User, { foreignKey: "userId", as: "user" });

// Users ↔ Orders
User.hasMany(Order, { foreignKey: "userId", as: "orders", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Users ↔ Reviews
User.hasMany(Review, { foreignKey: "userId", as: "reviews", onDelete: "CASCADE" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

// Users ↔ Cart
User.hasOne(Cart, { foreignKey: "userId", as: "cart", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

// ---------------------
// ShippingAddresses
// ---------------------

ShippingAddress.hasMany(Order, { foreignKey: "shippingAddressId", as: "orders", onDelete: "RESTRICT" });
Order.belongsTo(ShippingAddress, { foreignKey: "shippingAddressId", as: "shippingAddress" });

// ---------------------
// Orders
// ---------------------

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Orders ↔ DeliveryStaff
DeliveryStaff.hasMany(Order, { foreignKey: "assignedTo", as: "assignedOrders", onDelete: "SET NULL" });
Order.belongsTo(DeliveryStaff, { foreignKey: "assignedTo", as: "deliveryStaff" });

// ---------------------
// Products
// ---------------------

Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems", onDelete: "RESTRICT" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews", onDelete: "CASCADE" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

Category.hasMany(Product, { foreignKey: "categoryId", as: "products", onDelete: "RESTRICT" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// ---------------------
// Sizes
// ---------------------

Size.hasMany(OrderItem, { foreignKey: "sizeId", as: "orderItems", onDelete: "SET NULL" });
OrderItem.belongsTo(Size, { foreignKey: "sizeId", as: "size" });

Size.hasMany(CartItem, { foreignKey: "sizeId", as: "cartItems", onDelete: "SET NULL" });
CartItem.belongsTo(Size, { foreignKey: "sizeId", as: "size" });

Size.hasMany(ProductSize, { foreignKey: "sizeId", as: "productSizes", onDelete: "CASCADE" });
ProductSize.belongsTo(Size, { foreignKey: "sizeId", as: "size" });

// ---------------------
// Product Sizes (Many-to-Many with Stock info)
// ---------------------

Product.hasMany(ProductSize, { foreignKey: "productId", as: "productSizes", onDelete: "CASCADE" });
ProductSize.belongsTo(Product, { foreignKey: "productId", as: "product" });

// ---------------------
// Cart
// ---------------------

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

// ---------------------
// DeliveryStaff ↔ DeliveryZone (Many-to-Many)
// ---------------------

DeliveryStaff.belongsToMany(DeliveryZone, { through: "DeliveryStaffZones", as: "zones" });
DeliveryZone.belongsToMany(DeliveryStaff, { through: "DeliveryStaffZones", as: "staff" });

// ---------------------
// Soft-delete hook for User
// ---------------------

User.addHook("beforeDestroy", async (user, options) => {
  await user.update({
    name: "Deleted User",
    email: `deleted_${user.id}@example.com`,
    passwordHash: null,
    isActive: false,
    deletionRequest: false,
  }, { transaction: options.transaction });
});

// ---------------------
// Export
// ---------------------

export {
  sequelize,
  User,
  DeliveryStaff,
  DeliveryZone,
  Category,
  Size,
  Product,
  ProductSize,
  ShippingAddress,
  Order,
  OrderItem,
  Review,
  Cart,
  CartItem
};
