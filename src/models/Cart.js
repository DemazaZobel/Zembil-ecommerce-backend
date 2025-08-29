// src/models/Cart.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
        model: User, // links to User table
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
