
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DeliveryZone = sequelize.define(
  "DeliveryZone",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }, // <-- match your table column
    areas: { type: DataTypes.TEXT },
  },
  {
    tableName: "deliveryzones", // matches your PostgreSQL table
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

export default DeliveryZone;






