import { z } from "zod";

export const updateAttendanceSchema = z.object({
    clock_out: z
        .string()
        .nonempty("Clock in time is required.")
        .refine(
            (val) => !val || /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val),
            {
                message: "Clock out format must be HH:MM:SS.",
            }
        ),
});

export type UpdateAttendanceForm = z.infer<typeof updateAttendanceSchema>;