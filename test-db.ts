import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();


dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

const testConnection = async () => {
  try {
    console.log("Testing DNS resolution...");

    const records = await dns.promises.resolveSrv(
      "_mongodb._tcp.cluster0.llwrxqs.mongodb.net"
    );

    console.log("DNS SRV records:", records);

    console.log("Testing MongoDB connection...");

    await mongoose.connect(process.env.MONGO_URL!, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully!");

    await mongoose.connection.db?.admin().ping();

    console.log("MongoDB ping successful!");

  }catch (error: any) {
  console.error("\nMongoDB connection failed!");
  console.error("Main error:", error.message);

  if (error.reason?.servers) {
    for (const [address, server] of error.reason.servers) {
      console.log("\nServer:", address);
      console.log("Error:", server.error);
      console.log("Error message:", server.error?.message);
      console.log("Error code:", server.error?.code);
    }
  }
} finally {
  await mongoose.disconnect();
}
};

testConnection();