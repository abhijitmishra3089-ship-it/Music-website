import { logger } from "../config/logger.js";

export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  logger.error({ err, requestId: req.id }, "Request failed");
  if (res.headersSent) return next(err);
  if (err?.code === 11000) {
    return res.status(409).json({ success: false, message: "Resource already exists" });
  }
  const status = Number.isInteger(err.status) ? err.status : 500;
  res.status(status).json({
    success: false,
    message: status >= 500 && process.env.NODE_ENV === "production"
      ? "Internal server error" : (err.message || "Request failed")
  });
}
