import { Router } from "express";
import mongoose from "mongoose";
import { redis } from "../../config/redis.js";

const router = Router();
router.get("/live", (req, res) => res.json({ status: "ok" }));
router.get("/ready", async (req, res) => {
  let timer;
  try {
    if (mongoose.connection.readyState !== 1) throw new Error("MongoDB not ready");
    await Promise.race([
      redis.ping(),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Redis timeout")), 1000); })
    ]);
    res.json({ status: "ready" });
  } catch {
    res.status(503).json({ status: "not_ready" });
  } finally {
    clearTimeout(timer);
  }
});
export default router;
