// src/controllers/productController.js
import Product from "../models/Product.js";
import ProductSize from "../models/ProductSize.js";
import Size from "../models/Size.js";
import Category from "../models/Category.js";
import { Op } from "sequelize";
import sequelize from "../models/index.js";

// -------------------------
// CREATE PRODUCT
// -------------------------
export const createProduct = async (req, res) => {
  console.log("REQ.FILES:", req.files); // Here are your uploaded images
  try {
    const {
      name, description, price, categoryId,
      tags, onSale, saleType, saleValue, saleStart, saleEnd, sizes
    } = req.body;

    const imagePaths = req.files
  ? req.files.map(f => f.path.replace(/\\/g, "/")) // Replace \ with /
  : [];


    const product = await Product.create({
      name,
      description,
      price: price ? parseFloat(price) : 0,
      categoryId: categoryId ? parseInt(categoryId) : null,
      images: imagePaths,
      tags: tags ? JSON.parse(tags) : [],
      onSale: !!onSale,
      saleType: saleType || null,
      saleValue: saleValue ? parseFloat(saleValue) : null,
      saleStart: saleStart ? new Date(saleStart) : null,
      saleEnd: saleEnd ? new Date(saleEnd) : null,
    });
    console.log("Created Product:", product.toJSON());

    // Handle sizes
    if (sizes && sizes.length > 0) {
      const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
      const productSizes = parsedSizes.map((s) => ({
        productId: product.id,
        sizeId: parseInt(s.sizeId),
        stock: parseInt(s.stock) || 0,
      }));
      await ProductSize.bulkCreate(productSizes);
    }

    // Return product with sizes
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "name", "type"] },
        {
          model: ProductSize,
          as: "productSizes",
          include: [{ model: Size, as: "sizeDetail", attributes: ["id", "name"] }],
        },
      ],
    });

    // Format sizes for frontend
    const formatted = {
      ...createdProduct.toJSON(),
      sizes: createdProduct.productSizes.map((ps) => ({
        sizeId: ps.sizeId,
        name: ps.sizeDetail?.name || "",
        stock: ps.stock,
      })),
    };

    res.status(201).json({ message: "Product created successfully", product: formatted });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

// -------------------------
// GET ALL PRODUCTS
// -------------------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: "category", attributes: ["id", "name", "type"] },
        {
          model: ProductSize,
          as: "productSizes",
          include: [{ model: Size, as: "sizeDetail", attributes: ["id", "name"] }],
        },
      ],
    });

    // Format sizes for frontend
    const formatted = products.map((p) => ({
      ...p.toJSON(),
      sizes: p.productSizes.map((ps) => ({
        sizeId: ps.sizeId,
        name: ps.sizeDetail?.name || "",
        stock: ps.stock,
      })),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("GET /api/products error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// -------------------------
// GET PRODUCT BY ID
// -------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "name", "type", "age"] },
        {
          model: ProductSize,
          as: "productSizes",
          include: [{ model: Size, as: "sizeDetail", attributes: ["id", "name"] }],
        },
      ],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Format sizes for frontend
    const formatted = {
      ...product.toJSON(),
      sizes: product.productSizes.map((ps) => ({
        sizeId: ps.sizeId,
        name: ps.sizeDetail?.name || "",
        stock: ps.stock,
      })),
    };

    res.json(formatted);
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------------
// UPDATE PRODUCT
// -------------------------
export const updateProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const product = await Product.findByPk(req.params.id, { transaction: t });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const {
      name,
      description,
      price,
      categoryId,
      tags,
      sizes,
      onSale,
      saleType,
      saleValue,
      saleStart,
      saleEnd,
    } = req.body;

    // Update product info
    const updatedImages = req.files ? req.files.map((file) => file.path) : product.images;

    await product.update(
      {
        name: name ?? product.name,
        description: description ?? product.description,
        price: price ? parseFloat(price) : product.price,
        categoryId: categoryId ? parseInt(categoryId) : product.categoryId,
        tags: tags ? JSON.parse(tags) : product.tags,
        onSale: onSale ?? product.onSale,
        saleType: saleType ?? product.saleType,
        saleValue: saleValue ? parseFloat(saleValue) : product.saleValue,
        saleStart: saleStart ? new Date(saleStart) : product.saleStart,
        saleEnd: saleEnd ? new Date(saleEnd) : product.saleEnd,
        images: updatedImages,
      },
      { transaction: t }
    );

    // Update sizes
    if (sizes && Array.isArray(JSON.parse(sizes))) {
      const sizesArray = JSON.parse(sizes).map((s) => ({
        sizeId: parseInt(s.sizeId),
        stock: parseInt(s.stock) || 0,
      }));

      for (const s of sizesArray) {
        const existing = await ProductSize.findOne({
          where: { productId: product.id, sizeId: s.sizeId },
          transaction: t,
        });
        if (existing) await existing.update({ stock: s.stock }, { transaction: t });
        else await ProductSize.create({ productId: product.id, sizeId: s.sizeId, stock: s.stock }, { transaction: t });
      }

      // Remove sizes not in new submission
      const sizeIdsToKeep = sizesArray.map((s) => s.sizeId);
      await ProductSize.destroy({
        where: { productId: product.id, sizeId: { [Op.notIn]: sizeIdsToKeep } },
        transaction: t,
      });
    }

    await t.commit();

    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: "category", attributes: ["id", "name", "type"] },
        {
          model: ProductSize,
          as: "productSizes",
          include: [{ model: Size, as: "sizeDetail", attributes: ["id", "name"] }],
        },
      ],
    });

    // Format sizes for frontend
    const formatted = {
      ...updatedProduct.toJSON(),
      sizes: updatedProduct.productSizes.map((ps) => ({
        sizeId: ps.sizeId,
        name: ps.sizeDetail?.name || "",
        stock: ps.stock,
      })),
    };

    res.json({ success: true, message: "Product updated successfully", product: formatted });
  } catch (error) {
    await t.rollback();
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

// -------------------------
// DELETE PRODUCT
// -------------------------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
