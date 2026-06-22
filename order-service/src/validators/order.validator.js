import { z } from "zod";

export const createOrderSchema = z.object({
  restaurantId: z.string(),

  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1),
});