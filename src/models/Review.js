// src/models/Review.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Review = sequelize.define("Review", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.DECIMAL(2,1), allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: "reviews", timestamps: true });

export default Review;
