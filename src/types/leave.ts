export interface Leave {
    id: number;
    employee: {
        id: string
        code: string
        name: string
        department: string | null
        position: string | null
        manager: {
            id: string;
            name: string;
            email: string;
        } | null
    };
    type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
    approved_by: {
        id: string;
        name: string;
    } | null;
    created_at: string;
    updated_at: string;
}

export type LeavesResponse = Leave[];