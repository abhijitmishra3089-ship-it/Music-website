import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { env, allowedOrigins } from "./config/env.js";
import { logger } from "./config/logger.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import songRoutes from "./modules/songs/songs.routes.js";
import playlistRoutes from "./modules/playlists/playlists.routes.js";
import searchRoutes from "./modules/search/search.routes.js";
import healthRoutes from "./modules/health/health.routes.js";

const app = express();
app.disable("x-powered-by");
if (env.TRUST_PROXY_HOPS > 0) app.set("trust proxy", env.TRUST_PROXY_HOPS);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed"));
  },
  credentials: true
}));
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());
app.use(pinoHttp({ logger }));
app.use("/api/v1", generalLimiter);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/search", searchRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
