import { z } from "zod";

export const createLeaveSchema = z.object({
    type: z
        .enum(["annual", "sick", "unpaid", "other"]),

    start_date: z
        .any()
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "Start date is required and must be a valid date",
        }),

    end_date: z
        .any()
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
            message: "End date is required and must be a valid date",
        }),

    reason: z
        .string()
        .optional()
});

export type CreateLeaveForm = z.infer<typeof createLeaveSchema>;