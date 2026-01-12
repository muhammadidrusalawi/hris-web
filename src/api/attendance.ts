import axiosInstance from "@/utils/axios-instance.ts";
import type {Attendance, AttendancesResponse} from "@/types/attendance.ts";
import type {ApiResponse} from "@/types/api.ts";
import {type CreateAttendanceForm, createAttendanceSchema} from "@/schemas/attendance/create-attendance-schema.ts";
import {type UpdateAttendanceForm, updateAttendanceSchema} from "@/schemas/attendance/update-attendace-schema.ts";

export const listAttendanceFromAdminApi = async (): Promise<ApiResponse<AttendancesResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<AttendancesResponse>>("/admin/attendances");
    return res.data;
};

export const listAttendanceFromEmployeeApi = async (): Promise<ApiResponse<AttendancesResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<AttendancesResponse>>("/employee/attendances");
    return res.data;
};

export const createAttendanceFromEmployeeApi = async (
    payload: CreateAttendanceForm,
): Promise<ApiResponse<Attendance>> => {
    const parsed = createAttendanceSchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Attendance>>(
        "/employee/attendances",
        parsed,
    );
    return res.data;
};

export const updateAttendanceFromEmployeeApi = async (
    id: number,
    payload: UpdateAttendanceForm,
): Promise<ApiResponse<Attendance>> => {
    const parsed = updateAttendanceSchema.parse(payload);
    const res = await axiosInstance.put<ApiResponse<Attendance>>(
        `/employee/attendances/${id}`,
        parsed,
    );
    return res.data;
};