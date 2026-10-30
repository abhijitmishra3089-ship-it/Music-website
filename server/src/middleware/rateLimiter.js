import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../config/redis.js";
import { env } from "../config/env.js";

const makeLimiter = (limit, prefix) => rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  store: new RedisStore({
    prefix,
    sendCommand: (...args) => redis.call(...args)
  }),
  message: { success: false, message: "Too many requests" }
});

export const generalLimiter = makeLimiter(env.RATE_LIMIT_MAX, "rl:api:");
export const authLimiter = makeLimiter(env.AUTH_RATE_LIMIT_MAX, "rl:auth:");
