export interface LeaveBalance {
    employee: {
        id: string
        code: string
        name: string
        department: string | null
        position: string | null
    }

    leave_balance: {
        year: number
        total: number
        used: number
        remaining: number
    } | null

    pending_leaves: number
}

export type LeaveBalancesResponse = LeaveBalance[];