// src/models/DeliveryStaff.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DeliveryStaff = sequelize.define("DeliveryStaff", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "delivery" },
  zoneId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "delivery_staff", timestamps: true });

export default DeliveryStaff;
