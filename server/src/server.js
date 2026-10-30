import http from "node:http";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { redis } from "./config/redis.js";
import { logger } from "./config/logger.js";
import app from "./app.js";
import { closePlayHistoryQueue } from "./queues/playHistory.queue.js";

let server;
let stopping = false;

async function start() {
  await connectDB();
  await redis.ping();
  server = http.createServer(app);
  server.listen(env.PORT, () => logger.info({ port: env.PORT }, "DHUN API started"));
}
async function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  logger.info({ signal }, "Shutdown started");
  const timer = setTimeout(() => process.exit(1), 15000);
  timer.unref();
  try {
    if (server) await new Promise(resolve => server.close(resolve));
    await closePlayHistoryQueue();
    await redis.quit();
    await mongoose.disconnect();
    clearTimeout(timer);
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "Shutdown failed");
    process.exit(1);
  }
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
start().catch(err => {
  logger.error({ err }, "Startup failed");
  process.exit(1);
});
