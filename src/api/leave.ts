import axiosInstance from "@/utils/axios-instance.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {LeaveBalance, LeaveBalancesResponse} from "@/types/leave-balance.ts";
import type {Leave, LeavesResponse} from "@/types/leave.ts";
import {type CreateLeaveForm, createLeaveSchema} from "@/schemas/leave/create-leave-schema.ts";

export const listLeaveBalancesAdminApi = async (): Promise<ApiResponse<LeaveBalancesResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<LeaveBalancesResponse>>("/admin/leave-balances");
    return res.data;
};

export const leaveBalanceDetailAdminApi = async (
    id: string,
): Promise<ApiResponse<LeavesResponse>> => {
    const res = await axiosInstance.get<ApiResponse<LeavesResponse>>(
        `/admin/leave-balances/${id}`,
    );
    return res.data;
};

export const listLeaveBalancesEmployeeApi = async (year?: number): Promise<ApiResponse<LeaveBalance>> => {
    const query = year ? `?year=${year}` : "";
    const res = await axiosInstance.get<ApiResponse<LeaveBalance>>(`/employee/leave-balances${query}`);
    return res.data;
};

export const listLeavesEmployeeApi = async (year?: number): Promise<ApiResponse<LeavesResponse>> => {
    const query = year ? `?year=${year}` : "";
    const res = await axiosInstance.get<ApiResponse<LeavesResponse>>(`/employee/leaves${query}`);
    return res.data;
};

export const createLeaveEmployeeApi = async (
    payload: CreateLeaveForm,
): Promise<ApiResponse<Leave>> => {
    const parsed = createLeaveSchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Leave>>(
        "/employee/leaves",
        parsed,
    );
    return res.data;
};

export const approveLeaveAdminApi = async (id: number): Promise<ApiResponse<Leave>> => {
    const res = await axiosInstance.post<ApiResponse<Leave>>(`/admin/leaves/approve/${id}`);
    return res.data;
};