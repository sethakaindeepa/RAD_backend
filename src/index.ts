import "dotenv/config";
import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

import express from "express";
import cors from "cors";

import mongoose from "mongoose";

import productRoutes from "./routes/product.routers";
import AuthRouter from "./routes/auth.routers"


const app = express();

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL;



app.use(cors());
app.use(express.json());




app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to the ToyLand API!",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "ToyLand backend is running!",
  });
});



app.use("/api/products", productRoutes);
app.use("/api/v1/auth", AuthRouter)


async function startServer() {
  try {
   
    if (!MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    
    await mongoose.connect(MONGO_URL);

    console.log("DB connected..!");

    
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error("Failed to connect DB:", error);
    process.exit(1);
  }
}

startServer();