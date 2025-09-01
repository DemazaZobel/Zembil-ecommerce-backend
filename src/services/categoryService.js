import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Create a new category
export const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

// Get all categories
export const getAllCategories = async () => {
  return await Category.findAll({
    include: ["products"] // include all products in the category
  });
};

// Get category by ID
export const getCategoryById = async (id) => {
  return await Category.findByPk(id, {
    include: ["products"]
  });
};

// Update category info
export const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) throw { status: 404, message: "Category not found" };
  return await category.update(data);
};

// Delete category
export const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) throw { status: 404, message: "Category not found" };
  return await category.destroy();
};
