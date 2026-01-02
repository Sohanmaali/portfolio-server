import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/modules/auth/auth.route.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// DB init
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
