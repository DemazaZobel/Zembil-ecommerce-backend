// src/models/ShippingAddress.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ShippingAddress = sequelize.define("ShippingAddress", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  fullName: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(255), allowNull: false },
  city: { type: DataTypes.STRING(100), allowNull: false },
  area: { type: DataTypes.STRING(100), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  postalCode: { type: DataTypes.STRING(20), allowNull: true },
}, { tableName: "shipping_addresses", timestamps: false });

export default ShippingAddress;
