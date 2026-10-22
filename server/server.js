
import "dotenv/config";
import express from "express";
import connectDb from "./config/db.js";
import UserRegistar from "./routes/auth.routes.js";
import connectRedis from './config/redis.js'
const app = express();
app.use(express.json());
await connectRedis();
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is live"
  });
});
app.use("/api/auth", UserRegistar);
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is live on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};
startServer();
