import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .max(255, { message: "Name must be at most 255 characters long" })
        .optional(),

    password: z
        .string()
        .optional(),

    password_confirmation: z
        .string()
        .optional(),
});

export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;