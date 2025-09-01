// src/controllers/CategoryController.js
import Category from "../models/Category.js";

// -------------------- CREATE CATEGORY --------------------
export const createCategory = async (req, res, next) => {
  try {
    const { name, type, age } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await Category.create({ name, type, age });
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    next(error);
  }
};

// -------------------- GET ALL CATEGORIES --------------------
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// -------------------- GET CATEGORY BY ID --------------------
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// -------------------- UPDATE CATEGORY --------------------
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const { name, type, age } = req.body;
    // Only update provided fields
    if (name !== undefined) category.name = name;
    if (type !== undefined) category.type = type;
    if (age !== undefined) category.age = age;

    await category.save();
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    next(error);
  }
};

// -------------------- DELETE CATEGORY --------------------
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
