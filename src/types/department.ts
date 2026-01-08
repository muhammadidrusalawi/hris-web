export interface Department {
    id: number;
    code: string;
    name: string;
    manager: {
        id: string,
        name: string,
    };
    employee_count: number;
    employees?: {
        id: string;
        employee_code: string;
        name: string;
        position?: {
            name: string;
        } | null;
        status: string;
        join_date: string;
    }[];
}

export type DepartmentsResponse = Department[];