// src/models/Order.js
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
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
      field: "userid", // ✅ matches DB column
      references: {
        model: User,
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },

    assignedToId: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      field: "assignedtoid", // ✅ matches DB column
      references: {
        model: DeliveryStaff,
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      comment: "Delivery staff assigned to this order"
    },

    shippingAddressId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: "shippingaddressid", // ✅ matches DB column
      references: {
        model: ShippingAddress,
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      comment: "Address to which order will be delivered"
    },

    totalPrice: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      field: "totalprice", // ✅ matches DB column
      comment: "Total order amount"
    },

    paymentStatus: { 
      type: DataTypes.STRING(50), 
      allowNull: false,
      field: "paymentstatus", // ✅ matches DB column
      comment: "Pending, Completed, Failed, etc."
    },

    paymentMethod: { 
      type: DataTypes.STRING(50), 
      allowNull: true,
      field: "paymentmethod", // ✅ matches DB column
      comment: "Cash, Card, Online Payment etc."
    },

    paymentReference: { 
      type: DataTypes.STRING(100), 
      allowNull: true,
      field: "paymentreference", // ✅ matches DB column
      comment: "Transaction ID or reference"
    },

    orderStatus: { 
      type: DataTypes.STRING(50), 
      allowNull: false,
      field: "orderstatus", // ✅ matches DB column
      comment: "Processing, Shipped, Delivered, etc."
    },
  },
  { 
    tableName: "orders", 
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

export default Order;
