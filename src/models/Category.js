// src/models/Category.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  type: { type: DataTypes.STRING(50), allowNull: true },
  age: { type: DataTypes.STRING(50), allowNull: true },
}, { tableName: "categories", timestamps: true });

export default Category;
