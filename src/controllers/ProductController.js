// // src/controllers/ProductController.js
// import Product from "../models/Product.js";
// import Category from "../models/Category.js";

// // -------------------- CREATE PRODUCT --------------------
// export const createProduct = async (req, res, next) => {
//   try {
//     const { name, description, price, categoryId, images, tags, sizes, onSale, saleType, saleValue, saleStart, saleEnd } = req.body;

//     if (!name || !price || !categoryId) {
//       return res.status(400).json({ message: "Name, price, and categoryId are required" });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       categoryId,
//       images: images || [],
//       tags: tags || [],
//       sizes: sizes || [],
//       onSale,
//       saleType,
//       saleValue,
//       saleStart,
//       saleEnd,
//     });

//     res.status(201).json({ message: "Product created", product });
//   } catch (error) {
//     next(error);
//   }
// };

// // -------------------- GET ALL PRODUCTS --------------------
// export const getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.findAll({ include: { model: Category, as: "category" } });
//     res.json(products);
//   } catch (error) {
//     next(error);
//   }
// };

// // -------------------- GET PRODUCT BY ID --------------------
// export const getProductById = async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id, { include: { model: Category, as: "category" } });
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// };

// // -------------------- UPDATE PRODUCT --------------------
// export const updateProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const { name, description, price, categoryId, images, tags, sizes, onSale, saleType, saleValue, saleStart, saleEnd } = req.body;

//     await product.update({
//       name: name ?? product.name,
//       description: description ?? product.description,
//       price: price ?? product.price,
//       categoryId: categoryId ?? product.categoryId,
//       images: images ?? product.images,
//       tags: tags ?? product.tags,
//       sizes: sizes ?? product.sizes,
//       onSale: onSale ?? product.onSale,
//       saleType: saleType ?? product.saleType,
//       saleValue: saleValue ?? product.saleValue,
//       saleStart: saleStart ?? product.saleStart,
//       saleEnd: saleEnd ?? product.saleEnd,
//     });

//     res.json({ message: "Product updated", product });
//   } catch (error) {
//     next(error);
//   }
// };

// // -------------------- DELETE PRODUCT --------------------
// export const deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     await product.destroy();
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     next(error);
//   }
// };
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Validate required fields
    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: "Name, price, and categoryId are required" });
    }

    // Handle uploaded images
    const images = req.files ? req.files.map(file => "/uploads/" + file.filename) : [];

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      images,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category" }], // must match Product.belongsTo alias
    });
    res.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        as: "category",
        attributes: ["id", "name", "type", "age"],
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, categoryId } = req.body;

    // Update images if uploaded; else keep existing
    const images = req.files ? req.files.map(file => "/uploads/" + file.filename) : product.images;

    await product.update({
      name: name ?? product.name,
      description: description ?? product.description,
      price: price ?? product.price,
      categoryId: categoryId ?? product.categoryId,
      images,
    });

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
