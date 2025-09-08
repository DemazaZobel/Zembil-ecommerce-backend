// import sequelize from "../config/db.js";
// import { DataTypes } from "sequelize";

// const Category = sequelize.define(
//   "Category",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING(50), allowNull: false },
//     type: { type: DataTypes.STRING(50), allowNull: true },
//     age: { type: DataTypes.STRING(50), allowNull: true },
//   },
//   {
//     tableName: "categories",
//     timestamps: false,
//   }
// );

// // ❌ This might be missing
// export default Category;
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Product from "./Product.js"; // import Product for association

// Define Category model
const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    type: { type: DataTypes.STRING(50), allowNull: true },
    age: { type: DataTypes.STRING(50), allowNull: true },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);


export default Category;
