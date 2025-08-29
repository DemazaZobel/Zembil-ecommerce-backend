// src/models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

import DeliveryStaff from "./DeliveryStaff.js";

import ShippingAddress from "./ShippingAddress.js";

const Order = sequelize.define(
  "Order",
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
        model:User, // references Users table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    assignedTo: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: ShippingAddress, // references DeliveryStaff table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      comment: "Delivery staff assigned to this order"
    },
    shippingAddressId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: DeliveryStaff, // references ShippingAddresses table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      comment: "Address to which order will be delivered"
    },
    totalPrice: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false,
      comment: "Total order amount"
    },
    paymentStatus: { 
      type: DataTypes.STRING(50), 
      allowNull: false,
      comment: "Pending, Completed, Failed, etc."
    },
    paymentMethod: { 
      type: DataTypes.STRING(50), 
      allowNull: true,
      comment: "Cash, Card, Online Payment etc."
    },
    paymentReference: { 
      type: DataTypes.STRING(100), 
      allowNull: true,
      comment: "Transaction ID or reference"
    },
    orderStatus: { 
      type: DataTypes.STRING(50), 
      allowNull: false,
      comment: "Processing, Shipped, Delivered, etc."
    },
  },
  { 
    tableName: "orders", 
    timestamps: true 
  }
);

export default Order;
