// import sequelize from "../config/db.js";
// import { DataTypes } from "sequelize";
// import DeliveryZone from "./DeliveryZone.js";

// const DeliveryStaff = sequelize.define(
//   "DeliveryStaff",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING(100), allowNull: false },
//     email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
//     passwordHash: { 
//       type: DataTypes.STRING(255), 
//       allowNull: false, 
//       field: "passwordhash", // maps to actual column
//       comment: "Used for staff login to access their dashboard"
//     },
//     role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "delivery" },
//     zoneId: { 
//       type: DataTypes.INTEGER, 
//       allowNull: false, 
//       field: "zoneid",       // maps to actual column
//       references: {
//         model: DeliveryZone,
//         key: "id"
//       },
//       onUpdate: "CASCADE",
//       onDelete: "RESTRICT",
//       comment: "The zone this delivery staff is responsible for"
//     },
//     // area: {
//     //   type: DataTypes.STRING(100),
//     //   allowNull: false,
//     //   comment: "Specific area in the zone this staff is assigned to"
//     // },
//     createdAt: { type: DataTypes.DATE, allowNull: false, field: "createdat" },
//     updatedAt: { type: DataTypes.DATE, allowNull: false, field: "updatedat" }
//   },
//   { 
//     tableName: "deliverystaff", // exact table name in PostgreSQL
//     timestamps: true 
//   }
// );

// export default DeliveryStaff;
// src/models/DeliveryStaff.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import DeliveryZone from "./DeliveryZone.js";

const DeliveryStaff = sequelize.define(
  "DeliveryStaff",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    zoneId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "deliverystaff", // <-- matches your PostgreSQL table
    timestamps: true,
  }
);

// Association
DeliveryStaff.belongsTo(DeliveryZone, { foreignKey: "zoneId", as: "zone" });

export default DeliveryStaff;


