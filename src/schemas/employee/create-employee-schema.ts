import { z } from "zod";

export const createEmployeeSchema = z.object({
    name: z
        .string()
        .min(1, "Employee name is required")
        .max(100, "Employee name must be at most 100 characters long"),

    department_id: z
        .number()
        .min(1, "Department is required"),

    position_id: z
        .number()
        .min(1, "Position is required"),

    join_date: z
        .any()
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "Join date is required and must be a valid date",
        }),

    status: z
        .string()
        .min(1, "Status is required")
        .refine(
            (val) => ["active", "probation", "intern", "contract"].includes(val),
            { message: 'Invalid status. "resigned" is not allowed here' }
        ),
});

export type CreateEmployeeForm = z.infer<typeof createEmployeeSchema>;