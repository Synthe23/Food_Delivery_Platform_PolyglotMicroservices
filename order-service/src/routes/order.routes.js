import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import { createOrderSchema } from "../validators/order.validator.js";

import {
  create,
  myOrders,
  getById,
  updateStatus,
} from "../controllers/order.controller.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  create
);

router.get(
  "/my-orders",
  authMiddleware,
  myOrders
);

router.get(
  "/:id",
  authMiddleware,
  getById
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorize(
    "RESTAURANT_OWNER",
    "ADMIN"
  ),
  updateStatus
);

export default router;