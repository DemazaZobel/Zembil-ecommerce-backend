// src/models/DeliveryStaff.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DeliveryStaff = sequelize.define(
  "DeliveryStaff",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true 
    },
    passwordHash: { 
      type: DataTypes.STRING(255), 
      allowNull: false,
      comment: "Used for staff login to access their dashboard"
    },
    role: { 
      type: DataTypes.STRING(50), 
      allowNull: false, 
      defaultValue: "delivery" 
    },
    zoneId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: DeliveryZone, // links to DeliveryZones table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      comment: "The zone this delivery staff is responsible for"
    },
    area: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Specific area in the zone this staff is assigned to"
    }
  },
  { 
    tableName: "delivery_staff", 
    timestamps: true 
  }
);

export default DeliveryStaff;
