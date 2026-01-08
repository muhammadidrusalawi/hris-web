export interface Employee {
    id: string;
    employee_code: string;
    name: string;
    user?: {
        email: string;
    } | null;
    department?: {
        id: number;
        name: string;
    } | null;
    position?: {
        id:number;
        name: string;
    } | null;
    status: string;
    join_date: string;
}

export type EmployeesResponse = Employee[];