// src/models/ProductSize.js
import sequelize from "../config/db.js"; // ✅ now works
import { DataTypes } from "sequelize";
import Size from "./Size.js";
import Product from "./Product.js";

const ProductSize = sequelize.define(
  "ProductSize",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Size,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { tableName: "product_sizes", timestamps: false }
);

export default ProductSize;
