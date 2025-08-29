// src/models/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";





const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    images: { type: DataTypes.JSON }, // array of image URLs
        tags: {
    type: DataTypes.JSON, // stores array of strings like ["summer", "casual", "men"]
    allowNull: true,
    },
    onSale: { type: DataTypes.BOOLEAN, defaultValue: false },
    saleType: { type: DataTypes.STRING(20) }, // e.g., "percentage" or "fixed"
    saleValue: { type: DataTypes.DECIMAL(10,2) },
    saleStart: { type: DataTypes.DATE },
    saleEnd: { type: DataTypes.DATE },
  },
  { tableName: "products", timestamps: true }
);

export default Product;
