import dotenv from "dotenv";
dotenv.config();

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS, typeof process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

import { sequelize } from "./models/index.js";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error syncing database:", err);
    process.exit(1);
  }
};

syncDatabase();

