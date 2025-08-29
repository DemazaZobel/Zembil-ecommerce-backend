import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DeliveryZone = sequelize.define(
  "DeliveryZone",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    areas: {
      type: DataTypes.JSON, // array of area names
      allowNull: false,
    },
  },
  {
    tableName: "delivery_zones", // must be a string
    timestamps: true,
  }
);

export default DeliveryZone;
