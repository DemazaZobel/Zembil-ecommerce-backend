import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Product from "./Product.js";

const Review = sequelize.define(
  "Review",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "userid", // map to DB column
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Product, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "productid", // map to DB column
    },
    rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, field: "createdat" }, // map timestamps
    updatedAt: { type: DataTypes.DATE, field: "updatedat" },
  },
  {
    tableName: "reviews",
    freezeTableName: true,
    timestamps: true,
  }
);

export default Review;
