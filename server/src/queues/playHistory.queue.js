import { Queue } from "bullmq";
import { createQueueConnection } from "./connection.js";
import { env } from "../config/env.js";

const connection = createQueueConnection();
export const playHistoryQueue = new Queue("play-history", {
  connection, prefix: env.QUEUE_PREFIX,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { age: 86400, count: 10000 },
    removeOnFail: { age: 604800, count: 50000 }
  }
});
export async function closePlayHistoryQueue() {
  await playHistoryQueue.close();
  await connection.quit();
}
