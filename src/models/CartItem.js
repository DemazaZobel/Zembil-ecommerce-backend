// src/models/CartItem.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cart from "./Cart.js";
import Product from "./Product.js";
import Size from "./Size.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    cartId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: Cart, // links to Cart table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      comment: "The cart this item belongs to"
    },
    productId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'products', // links to Product table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      comment: "The product added to the cart"
    },
    sizeId: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'sizes', // links to Size table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      comment: "Optional size selected for the product"
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      comment: "Number of units of this product in the cart"
    },
    price: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false,
      comment: "Price per unit at the time it was added to the cart"
    },
  },
  { 
    tableName: "cart_items", 
    timestamps: false 
  }
);

export default CartItem;
