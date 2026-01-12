import { z } from "zod";

export const createAttendanceSchema = z.object({
    date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Attendance date is required and must be a valid date",
        }),

    clock_in: z
        .string()
        .nonempty("Clock in time is required.")
        .refine((val) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val), {
            message: "Clock in format must be HH:MM:SS.",
        }),

    clock_out: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val),
            {
                message: "Clock out format must be HH:MM:SS.",
            }
        ),
});

export type CreateAttendanceForm = z.infer<typeof createAttendanceSchema>;