// src/models/ShippingAddress.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"; // import User model for FK reference

const ShippingAddress = sequelize.define(
  "ShippingAddress",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    fullName: { type: DataTypes.STRING(100), allowNull: false },
    houseNumber: { type: DataTypes.STRING(50), allowNull: true }, // optional if not available
    street: { type: DataTypes.STRING(255), allowNull: false }, // street name or building
    city: { type: DataTypes.STRING(100), allowNull: false },
    area: { type: DataTypes.STRING(100), allowNull: false }, // neighborhood or local area
    specificTown: { type: DataTypes.STRING(100), allowNull: true }, // optional for large cities
    country: { type: DataTypes.STRING(100), allowNull: false },
    postalCode: { type: DataTypes.STRING(20), allowNull: true },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false }, // required for delivery contact
  },
  {
    tableName: "shipping_addresses",
    timestamps: false,
  }
);

export default ShippingAddress;
