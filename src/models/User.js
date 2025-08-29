// src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import DeliveryZone from "./DeliveryZone.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "customer" },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: DeliveryZone, // references DeliveryZone table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // soft-delete flag
    deletionRequest: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // user requested deletion
    deletedAt: { type: DataTypes.DATE, allowNull: true }, // timestamp of deletion
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true, // enables Sequelize soft delete with deletedAt
  }
);

export default User;
