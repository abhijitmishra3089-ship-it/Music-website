import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authLimiter } from "../../middleware/rateLimiter.js";
import { signupSchema, loginSchema } from "./auth.schemas.js";
import { signupController, loginController, logoutController, meController } from "./auth.controller.js";

const router = Router();
router.post("/signup", authLimiter, validate(signupSchema), asyncHandler(signupController));
router.post("/login", authLimiter, validate(loginSchema), asyncHandler(loginController));
router.post("/logout", asyncHandler(logoutController));
router.get("/me", authenticate, asyncHandler(meController));
export default router;
