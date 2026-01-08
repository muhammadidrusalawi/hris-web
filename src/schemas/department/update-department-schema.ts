import { z } from "zod";

export const updateDepartmentSchema = z.object({
    id: z
        .number()
        .int()
        .positive("Position id is invalid"),

    name: z
        .string()
        .max(100, "Department name must be at most 100 characters long")
        .optional(),

    manager_id: z
        .string()
        .min(1, "Please select a manager")
        .uuid("Please select a valid manager")
        .optional(),
});

export type UpdateDepartmentForm = z.infer<typeof updateDepartmentSchema>;