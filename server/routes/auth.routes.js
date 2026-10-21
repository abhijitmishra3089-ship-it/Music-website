import express from "express";
import { signup,login,getUser,Logout } from "../controllers/auth.controllers.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema,loginSchema } from "../validators/auth.validate.js";

const router = express.Router();

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/logout",
    Logout
)

router.get(
    "/:id",
    getUser
)
export default router;