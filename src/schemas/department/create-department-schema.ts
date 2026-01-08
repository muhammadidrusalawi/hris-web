import { z } from "zod";

export const createDepartmentSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Department name is required")
        .max(100, "Department name must be at most 100 characters long"),

    manager_id: z
        .string()
        .min(1, "Please select a manager")
        .uuid("Please select a valid manager"),
});

export type CreateDepartmentForm = z.infer<typeof createDepartmentSchema>;