import sequelize from "../config/db.js"; // ✅ now works
import { DataTypes } from "sequelize";
const Size = sequelize.define(
  "Size",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "sizes", timestamps: false }
);

export default Size;
