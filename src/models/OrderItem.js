// src/models/OrderItem.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  sizeId: { type: DataTypes.INTEGER, allowNull: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, { tableName: "order_items", timestamps: false });

export default OrderItem;
