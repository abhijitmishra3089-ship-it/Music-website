import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

export default router;