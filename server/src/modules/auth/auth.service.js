import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { env } from "../../config/env.js";

export async function signup({ displayName, email, password }) {
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
  try {
    const user = await User.create({ displayName, email, passwordHash });
    return { id: String(user._id), displayName: user.displayName, email: user.email };
  } catch (err) {
    if (err?.code === 11000) {
      const error = new Error("Email is already registered");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || user.status !== "active" ||
      !(await argon2.verify(user.passwordHash, password))) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign(
    { sub: String(user._id), role: user.role },
    env.JWT_ACCESS_SECRET,
    { algorithm: "HS256", expiresIn: env.ACCESS_TOKEN_TTL, issuer: "dhun-api", audience: "dhun-client" }
  );
  return {
    token,
    user: { id: String(user._id), displayName: user.displayName, email: user.email, role: user.role }
  };
}
