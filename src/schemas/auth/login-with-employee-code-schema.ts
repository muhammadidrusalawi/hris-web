import { z } from "zod";

export const loginWithEmployeeCodeSchema = z.object({
    employee_code: z.string().min(8, { message: "Employee code must be at least 8 characters long" }),
});

export type LoginWithEmployeeCodeForm = z.infer<typeof loginWithEmployeeCodeSchema>;