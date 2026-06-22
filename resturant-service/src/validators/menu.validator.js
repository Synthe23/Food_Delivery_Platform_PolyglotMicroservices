import { z } from "zod";

export const createMenuSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  available: z.boolean().optional(),
});

export const updateMenuSchema =
  createMenuSchema.partial();