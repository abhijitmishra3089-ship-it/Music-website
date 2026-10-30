import mongoose from "mongoose";
import { env } from "../config/env.js";
import { connectDB } from "../config/db.js";
import { createQueueConnection } from "../queues/connection.js";
import { Worker } from "bullmq";
import PlayHistory from "../models/PlayHistory.js";
import { logger } from "../config/logger.js";

await connectDB();
const connection = createQueueConnection();
const worker = new Worker("play-history", async job => {
  const { userId, songId, eventId, durationPlayed, playedAt } = job.data;
  await PlayHistory.updateOne(
    { eventId },
    { $setOnInsert: { userId, songId, eventId, durationPlayed, playedAt: new Date(playedAt) } },
    { upsert: true }
  );
}, {
  connection, prefix: env.QUEUE_PREFIX,
  concurrency: Number(process.env.WORKER_CONCURRENCY || 20)
});
worker.on("failed", (job, err) => logger.error({ jobId: job?.id, err }, "History job failed"));
worker.on("error", err => logger.error({ err }, "Worker error"));

async function shutdown() {
  await worker.close();
  await connection.quit();
  await mongoose.disconnect();
  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
