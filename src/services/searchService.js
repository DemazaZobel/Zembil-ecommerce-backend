import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Size from "../models/Size.js";
import ProductSize from "../models/ProductSize.js";
import { Op } from "sequelize";

// Search products by keyword, category, price range, or size
export const searchProducts = async ({ keyword, categoryId, minPrice, maxPrice, sizeId }) => {
  const whereClause = {};

  if (keyword) {
    whereClause.name = { [Op.iLike]: `%${keyword}%` }; // case-insensitive search
  }

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  if (minPrice || maxPrice) {
    whereClause.price = {};
    if (minPrice) whereClause.price[Op.gte] = minPrice;
    if (maxPrice) whereClause.price[Op.lte] = maxPrice;
  }

  let include = ["category"];
  
  if (sizeId) {
    include.push({
      association: "productSizes",
      where: { sizeId },
      include: ["size"]
    });
  }

  const products = await Product.findAll({
    where: whereClause,
    include
  });

  return products;
};

// Search categories by name
export const searchCategories = async (keyword) => {
  return await Category.findAll({
    where: {
      name: { [Op.iLike]: `%${keyword}%` }
    }
  });
};
