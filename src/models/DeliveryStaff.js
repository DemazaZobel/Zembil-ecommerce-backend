
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DeliveryStaff = sequelize.define(
  "DeliveryStaff",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false, field: "passwordhash" },
    
    role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "delivery" },
    zoneId: { type: DataTypes.INTEGER, allowNull: false, field: "zoneid" },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: "createdat" },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: "updatedat" }
  },
  {
    tableName: "deliverystaff",
    timestamps: true
  }
);

export default DeliveryStaff;



