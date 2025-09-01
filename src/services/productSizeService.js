import ProductSize from "../models/ProductSize.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

// Add a size to a product with initial stock
export const addProductSize = async (productId, sizeId, stock = 0) => {
  const productSize = await ProductSize.create({ productId, sizeId, stock });
  return productSize;
};

// Update stock for a product size
export const updateProductSize = async (id, data) => {
  const productSize = await ProductSize.findByPk(id);
  if (!productSize) throw { status: 404, message: "Product size not found" };
  return await productSize.update(data);
};

// Remove a size from a product
export const removeProductSize = async (id) => {
  const productSize = await ProductSize.findByPk(id);
  if (!productSize) throw { status: 404, message: "Product size not found" };
  return await productSize.destroy();
};

// Get all sizes for a product
export const getProductSizes = async (productId) => {
  return await ProductSize.findAll({
    where: { productId },
    include: ["size", "product"]
  });
};

// Get all products for a specific size
export const getProductsBySize = async (sizeId) => {
  return await ProductSize.findAll({
    where: { sizeId },
    include: ["product", "size"]
  });
};

