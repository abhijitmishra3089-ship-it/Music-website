import Redis from "ioredis";
import { env } from "../config/env.js";

export function createQueueConnection() {
  return new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) { return Math.min(times * 200, 2000); }
  });
}
