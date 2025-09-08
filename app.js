import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/models/index.js";// registers all models + associations
import path from "path";


// Routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/UserRoutes.js";
import deliveryStaffRoutes from "./src/routes/DeliveryStaffRoutes.js";
import deliveryZoneRoutes from "./src/routes/DeliveryZoneRoutes.js";
import categoryRoutes from "./src/routes/CategoryRoutes.js";
import productRoutes from "./src/routes/ProductRoutes.js";
import sizeRoutes from "./src/routes/SizeRoutes.js";
import productSizeRoutes from "./src/routes/ProductSizeRoutes.js";
import cartRoutes from "./src/routes/CartRoutes.js";
import cartItemRoutes from "./src/routes/CartItemRoutes.js";
import orderRoutes from "./src/routes/OrderRoutes.js";
import orderItemRoutes from "./src/routes/OrderItemRoutes.js";
import reviewRoutes from "./src/routes/ReviewRoutes.js";
import shippingAddressRoutes from "./src/routes/ShippingAddressRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deliveryStaff", deliveryStaffRoutes);
app.use("/api/deliveryZones", deliveryZoneRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/productSizes", productSizeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cartItems", cartItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orderItems", orderItemRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/shippingAddresses", shippingAddressRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ status, message });
});

export default app;
