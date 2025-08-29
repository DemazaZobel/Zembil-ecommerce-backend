// src/models/Size.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Size = sequelize.define(
  "Size",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "sizes", timestamps: false }
);

export default Size;
