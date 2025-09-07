import Size from "../models/Size.js";
import ProductSize from "../models/ProductSize.js";
import Product from "../models/Product.js";

// Create a new size
export const createSize = async (data) => {
  const size = await Size.create(data);
  return size;
};

// Get all sizes
export const getAllSizes = async () => {
  return await Size.findAll({
    include: ["productSizes"] // includes products using this size
  });
};

// Get size by ID
export const getSizeById = async (id) => {
  return await Size.findByPk(id, {
    include: ["productSizes"]
  });
};

// Update a size
export const updateSize = async (id, data) => {
  const size = await Size.findByPk(id);
  if (!size) throw { status: 404, message: "Size not found" };
  return await size.update(data);
};

// Delete a size
export const deleteSize = async (id) => {
  const size = await Size.findByPk(id);
  if (!size) throw { status: 404, message: "Size not found" };
  return await size.destroy();
};
