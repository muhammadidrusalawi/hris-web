import { z } from "zod";

export const updateEmployeeSchema = z.object({
    id: z
        .string(),

    name: z
        .string()
        .max(100, "Employee name must be at most 100 characters long")
        .optional(),

    department_id: z
        .number()
        .min(1, "Department is required")
        .optional(),

    position_id: z
        .number()
        .min(1, "Position is required")
        .optional(),

    status: z.enum(["active", "probation", "intern", "contract"], {
        error: 'Status "resigned" is not allowed',
    }).optional(),
});

export type UpdateEmployeeForm = z.infer<typeof updateEmployeeSchema>;
