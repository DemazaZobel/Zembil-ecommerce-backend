// src/models/Product.js
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Category from "./Category.js";

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Category, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      field: "categoryid",
    },

    images: { type: DataTypes.JSON, allowNull: true, field: "images" },
    tags: { type: DataTypes.JSON, allowNull: true, field: "tags" },
    sizes: { type: DataTypes.JSON, allowNull: true, field: "sizes" },

    onSale: { type: DataTypes.BOOLEAN, defaultValue: false, field: "onsale" },
    saleType: { type: DataTypes.STRING(20), field: "saletype" },
    saleValue: { type: DataTypes.DECIMAL(10, 2), field: "salevalue" },
    saleStart: { type: DataTypes.DATE, field: "salestart" },
    saleEnd: { type: DataTypes.DATE, field: "saleend" },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

export default Product;
