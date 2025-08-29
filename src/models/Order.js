// src/models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  assignedTo: { type: DataTypes.INTEGER, allowNull: true }, // delivery staff
  shippingAddressId: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  paymentStatus: { type: DataTypes.STRING(50), allowNull: false },
  paymentMethod: { type: DataTypes.STRING(50), allowNull: true },
  paymentReference: { type: DataTypes.STRING(100), allowNull: true },
  orderStatus: { type: DataTypes.STRING(50), allowNull: false },
}, { tableName: "orders", timestamps: true });

export default Order;
