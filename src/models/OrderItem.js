// src/models/OrderItem.js
import sequelize from "../config/db.js"; // ✅ now works
import { DataTypes } from "sequelize";

import Product from "./Product.js";
import Size from "./Size.js";
import Order from "./Order.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    orderId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: Order, // references Orders table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    productId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: Product, // references Products table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    sizeId: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: Size, // references Sizes table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 1 // default 1 if not specified
    },
    price: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false,
      comment: "Price at the time of order for this item"
    },
  },
  { 
    tableName: "order_items", 
    timestamps: false // optional, only needed if you want createdAt/updatedAt
  }
);

export default OrderItem;
