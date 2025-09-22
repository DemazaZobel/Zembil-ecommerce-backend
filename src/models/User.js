
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "deliveryzones", key: "id" },
    },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    deletionRequest: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "users", // ✅ lowercase
    timestamps: true,
  }
);

export default User;
