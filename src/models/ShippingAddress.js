// // src/models/ShippingAddress.js
// import sequelize from "../config/db.js"; // ✅ now works
// import { DataTypes } from "sequelize";
// import User from "./User.js";


// const ShippingAddress = sequelize.define(
//   "ShippingAddress",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: User,
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     },
//     fullName: { type: DataTypes.STRING(100), allowNull: false },
//     houseNumber: { type: DataTypes.STRING(50), allowNull: true }, // optional if not available
//     street: { type: DataTypes.STRING(255), allowNull: false }, // street name or building
//     city: { type: DataTypes.STRING(100), allowNull: false },
//     area: { type: DataTypes.STRING(100), allowNull: false }, // neighborhood or local area
//     specificTown: { type: DataTypes.STRING(100), allowNull: true }, // optional for large cities
//     country: { type: DataTypes.STRING(100), allowNull: false },
//     postalCode: { type: DataTypes.STRING(20), allowNull: true },
//     phoneNumber: { type: DataTypes.STRING(20), allowNull: false }, // required for delivery contact
//   },
//   {
//     tableName: "shippingaddresses",
//     timestamps: false,
//   }
// );

// export default ShippingAddress;
// src/models/ShippingAddress.js
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const ShippingAddress = sequelize.define(
  "ShippingAddress",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "userid", // maps model to DB column
    },
    fullName: { type: DataTypes.STRING(100), allowNull: false, field: "fullname" },
    houseNumber: { type: DataTypes.STRING(50), allowNull: true, field: "housenumber" },
    street: { type: DataTypes.STRING(255), allowNull: false },
    area: { type: DataTypes.STRING(100), allowNull: false },
    specificTown: { type: DataTypes.STRING(100), allowNull: true, field: "specifictown" },
    city: { type: DataTypes.STRING(100), allowNull: false },
    country: { type: DataTypes.STRING(100), allowNull: false },
    postalCode: { type: DataTypes.STRING(20), allowNull: true, field: "postalcode" },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false, field: "phonenumber" },
  },
  {
    tableName: "shippingaddresses", // table name in lowercase
    freezeTableName: true,           // prevent Sequelize from pluralizing
    timestamps: false,
  }
);



// ✅ Export default for proper ES module import
export default ShippingAddress;

