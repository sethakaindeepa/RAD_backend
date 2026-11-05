
import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the .env file");
  }

  await mongoose.connect(mongoUri);

  console.log("MongoDB Atlas connected successfully!");
}
