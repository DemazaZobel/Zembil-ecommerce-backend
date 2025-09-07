import Product from "../models/Product.js";
import ProductSize from "../models/ProductSize.js";
import Size from "../models/Size.js";
import Category from "../models/Category.js";

// Create a new product
export const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

// Get all products
export const getAllProducts = async () => {
  return await Product.findAll({
    include: ["category", "productSizes"] // includes category and sizes
  });
};

// Get product by ID
export const getProductById = async (id) => {
  return await Product.findByPk(id, {
    include: ["category", {
      association: "productSizes",
      include: ["size"]
    }]
  });
};

// Update product info
export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) throw { status: 404, message: "Product not found" };
  return await product.update(data);
};

// Delete product
export const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw { status: 404, message: "Product not found" };
  return await product.destroy();
};

// Add size with stock to a product
export const addProductSize = async (productId, sizeId, stock = 0) => {
  const productSize = await ProductSize.create({ productId, sizeId, stock });
  return productSize;
};

// Update stock for a product size
export const updateProductSizeStock = async (productId, sizeId, stock) => {
  const productSize = await ProductSize.findOne({ where: { productId, sizeId } });
  if (!productSize) throw { status: 404, message: "Product size not found" };
  return await productSize.update({ stock });
};

// Remove a size from a product
export const removeProductSize = async (productId, sizeId) => {
  const productSize = await ProductSize.findOne({ where: { productId, sizeId } });
  if (!productSize) throw { status: 404, message: "Product size not found" };
  return await productSize.destroy();
};
