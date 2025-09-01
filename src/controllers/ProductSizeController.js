import ProductSize from "../models/ProductSize.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

export const getAllProductSizes = async (req, res, next) => {
  try {
    const items = await ProductSize.findAll({
      include: [
        { model: Product, as: "product" },
        { model: Size, as: "size" }
      ]
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getProductSizeById = async (req, res, next) => {
  try {
    const item = await ProductSize.findByPk(req.params.id, {
      include: [
        { model: Product, as: "product" },
        { model: Size, as: "size" }
      ]
    });
    if (!item) return res.status(404).json({ message: "Product size not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createProductSize = async (req, res, next) => {
  try {
    const item = await ProductSize.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateProductSize = async (req, res, next) => {
  try {
    const item = await ProductSize.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Product size not found" });
    await item.update(req.body);
    res.json({ message: "Product size updated", item });
  } catch (error) {
    next(error);
  }
};

export const deleteProductSize = async (req, res, next) => {
  try {
    const item = await ProductSize.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Product size not found" });
    await item.destroy();
    res.json({ message: "Product size deleted" });
  } catch (error) {
    next(error);
  }
};
