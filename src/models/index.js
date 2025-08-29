const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const DeliveryStaff = require('./deliveryStaff')(sequelize, DataTypes);
const DeliveryZone = require('./deliveryZone')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Size = require('./size')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const ShippingAddress = require('./shippingAddress')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const OrderItem = require('./orderItem')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const CartItem = require('./cartItem')(sequelize, DataTypes);

// Associations

User.hasMany(ShippingAddress, { foreignKey: 'userId', as: 'addresses' });
ShippingAddress.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });

ShippingAddress.hasMany(Order, { foreignKey: 'shippingAddressId' });
Order.belongsTo(ShippingAddress, { foreignKey: 'shippingAddressId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Size.hasMany(OrderItem, { foreignKey: 'sizeId' });
OrderItem.belongsTo(Size, { foreignKey: 'sizeId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

DeliveryStaff.hasMany(Order, { foreignKey: 'assignedTo' });
Order.belongsTo(DeliveryStaff, { foreignKey: 'assignedTo', as: 'deliveryStaff' });

DeliveryStaff.belongsToMany(DeliveryZone, { through: 'DeliveryStaffZones', as: 'zones' });
DeliveryZone.belongsToMany(DeliveryStaff, { through: 'DeliveryStaffZones', as: 'staff' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'userId' });
Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  DeliveryStaff,
  DeliveryZone,
  Category,
  Size,
  Product,
  ShippingAddress,
  Order,
  OrderItem,
  Review,
  Cart,
  CartItem
};
