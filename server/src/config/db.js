import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URI, {
    maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 30),
    minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || 2),
    serverSelectionTimeoutMS: 5000,
    maxIdleTimeMS: 30000
  });
}
