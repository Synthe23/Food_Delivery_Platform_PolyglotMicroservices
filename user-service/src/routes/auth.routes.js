import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  register,
  login,
  me,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";

const router = Router();

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/me", authMiddleware, me);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
