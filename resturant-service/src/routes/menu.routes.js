import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createMenu,
  getMenu,
  updateMenu,
  removeMenu,
} from "../controllers/menu.controller.js";

import {
  createMenuSchema,
} from "../validators/menu.validator.js";

const router = Router();

router.post(
  "/restaurants/:id/menu",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  validate(createMenuSchema),
  createMenu
);

router.get(
  "/restaurants/:id/menu",
  getMenu
);

router.put(
  "/menu/:id",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  updateMenu
);

router.delete(
  "/menu/:id",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  removeMenu
);

export default router;