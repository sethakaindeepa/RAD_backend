import dns from "node:dns";

dns.setServers(["8.8.8.8"]);
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.routers";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the ToyLand API!" });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ToyLand backend is running!",
  });
});

app.use("/api/products", productRoutes);

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`ToyLand server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
