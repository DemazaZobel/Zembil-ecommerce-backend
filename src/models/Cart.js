// src/models/Cart.js
import sequelize from "../config/db.js"; // ✅ now works
import { DataTypes } from "sequelize";

const Cart = sequelize.define(
  "Cart",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'users', // table name as string
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      comment: "The user who owns this cart"
    },
  },
  { 
    tableName: "carts", 
    timestamps: true 
  }
);

export default Cart;
