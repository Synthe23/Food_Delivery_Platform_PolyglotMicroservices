import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  address: z.string().min(5),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();