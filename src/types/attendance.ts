export interface Attendance {
    id: number;
    employee_id: string;
    employee_code: string;
    employee_name: string;
    position: string;
    date: string;
    clock_in: string;
    clock_out?: string;
}

export type AttendancesResponse = Attendance[];