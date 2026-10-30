import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../models/User.js";

export async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.dhun_access;
    if (!token) return res.status(401).json({ message: "Authentication required" });
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"], issuer: "dhun-api", audience: "dhun-client"
    });
    const user = await User.findById(payload.sub).select("_id role status").lean();
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "Invalid or inactive account" });
    }
    req.user = { id: String(user._id), role: user.role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}
