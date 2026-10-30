import { signup, login } from "./auth.service.js";
import User from "../../models/User.js";
import { env } from "../../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE === "true",
  sameSite: env.COOKIE_SAME_SITE,
  path: "/",
  maxAge: 15 * 60 * 1000
};

export async function signupController(req, res) {
  const user = await signup(req.body);
  res.status(201).json({ success: true, user });
}
export async function loginController(req, res) {
  const result = await login(req.body);
  res.cookie("dhun_access", result.token, cookieOptions);
  res.json({ success: true, user: result.user });
}
export async function logoutController(req, res) {
  res.clearCookie("dhun_access", {
    httpOnly: true, secure: env.COOKIE_SECURE === "true",
    sameSite: env.COOKIE_SAME_SITE, path: "/"
  });
  res.status(204).end();
}
export async function meController(req, res) {
  const user = await User.findById(req.user.id).select("_id displayName email role createdAt").lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ success: true, user: { ...user, id: String(user._id) } });
}
