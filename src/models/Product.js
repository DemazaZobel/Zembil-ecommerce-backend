// src/models/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    images: { type: DataTypes.JSON }, // array of image URLs
    onSale: { type: DataTypes.BOOLEAN, defaultValue: false },
    saleType: { type: DataTypes.STRING(20) },
    saleValue: { type: DataTypes.DECIMAL(10,2) },
    saleStart: { type: DataTypes.DATE },
    saleEnd: { type: DataTypes.DATE },
  },
  { tableName: "products", timestamps: true }
);

export default Product;
