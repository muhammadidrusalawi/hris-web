import { z } from "zod";

export const createPositionSchema = z.object({
    name: z
        .string()
        .min(1, "Position name is required")
        .max(100, "Position name must be at most 100 characters long"),
});

export type CreatePositionForm = z.infer<typeof createPositionSchema>;