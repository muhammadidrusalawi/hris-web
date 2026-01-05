import { z } from "zod";

export const updatePositionSchema = z.object({
    id: z.number().int().positive("Position id is invalid"),
    name: z.string().min(1, "Position name is required").max(100),
});

export type UpdatePositionForm = z.infer<typeof updatePositionSchema>;