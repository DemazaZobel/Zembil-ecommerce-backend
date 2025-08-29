
import sequelize from "../config/database.js";
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

// Associations

User.hasMany(ShippingAddress, { foreignKey: "userId", as: "addresses" });
ShippingAddress.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Cart, { foreignKey: "userId", as: "cart" });
Cart.belongsTo(User, { foreignKey: "userId" });

ShippingAddress.hasMany(Order, { foreignKey: "shippingAddressId", as: "orders" });
Order.belongsTo(ShippingAddress, { foreignKey: "shippingAddressId" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Size.hasMany(OrderItem, { foreignKey: "sizeId" });
OrderItem.belongsTo(Size, { foreignKey: "sizeId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(ProductSize, { foreignKey: "productId", as: "productSizes" });
ProductSize.belongsTo(Product, { foreignKey: "productId" });

Size.hasMany(ProductSize, { foreignKey: "sizeId" });
ProductSize.belongsTo(Size, { foreignKey: "sizeId" });

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Size.hasMany(CartItem, { foreignKey: "sizeId" });
CartItem.belongsTo(Size, { foreignKey: "sizeId" });

DeliveryStaff.belongsToMany(DeliveryZone, { through: "DeliveryStaffZones", as: "zones" });
DeliveryZone.belongsToMany(DeliveryStaff, { through: "DeliveryStaffZones", as: "staff" });

DeliveryStaff.hasMany(Order, { foreignKey: "assignedTo", as: "assignedOrders" });
Order.belongsTo(DeliveryStaff, { foreignKey: "assignedTo", as: "deliveryStaff" });


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
