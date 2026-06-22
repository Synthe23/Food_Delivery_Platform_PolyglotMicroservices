import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  create,
  getAll,
  getById,
  update,
  remove
} from "../controllers/restaurant.controller.js";

import { createRestaurantSchema } from "../validators/restaurant.validator.js";
import { updateRestaurantSchema } from "../validators/restaurant.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  validate(createRestaurantSchema),
  create
);

router.put(
  "/:id",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  validate(updateRestaurantSchema),
  update
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("RESTAURANT_OWNER", "ADMIN"),
  remove
);

router.get("/", getAll);
router.get("/:id", getById);

export default router;
