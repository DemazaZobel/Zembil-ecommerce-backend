// // src/models/User.js
// import sequelize from "../config/db.js";
// import { DataTypes } from "sequelize";
// import DeliveryZone from "./DeliveryZone.js";

// const User = sequelize.define(
//   "User",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING(100), allowNull: false },
//     email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
//     passwordHash: { type: DataTypes.STRING(255), allowNull: false, field: "passwordhash" }, // map to DB
//     role: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "customer" },
//     zoneId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: DeliveryZone,
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "SET NULL",
//     },
//     isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
//     deletionRequest: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
//     deletedAt: { type: DataTypes.DATE, allowNull: true },
//   },
//   {
//     tableName: "users",
//     timestamps: true,
//     paranoid: true, // soft delete
//   }
// );

// export default User;
// src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "DeliveryZones", key: "id" },
    },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    deletionRequest: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "users", // ✅ lowercase
    timestamps: true,
  }
);

export default User;
