// src/models/CartItem.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define("CartItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cartId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  sizeId: { type: DataTypes.INTEGER, allowNull: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
}, { tableName: "cart_items", timestamps: false });

export default CartItem;
