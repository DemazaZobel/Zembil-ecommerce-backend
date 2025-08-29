// src/models/ProductSize.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductSize = sequelize.define(
  "ProductSize",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    sizeId: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { tableName: "product_sizes", timestamps: false }
);

export default ProductSize;
