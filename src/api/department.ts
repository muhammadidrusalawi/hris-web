import axiosInstance from "@/utils/axios-instance.ts";
import type {Department, DepartmentsResponse} from "@/types/department.ts";
import type {ApiResponse} from "@/types/api.ts";
import {type CreateDepartmentForm, createDepartmentSchema} from "@/schemas/department/create-department-schema.ts";
import {type UpdateDepartmentForm, updateDepartmentSchema} from "@/schemas/department/update-department-schema.ts";

export const listDepartmentApi = async (): Promise<ApiResponse<DepartmentsResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<DepartmentsResponse>>("/admin/departments");
    return res.data;
};

export const createDepartmentApi = async (
    payload: CreateDepartmentForm,
): Promise<ApiResponse<Department>> => {
    const parsed = createDepartmentSchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Department>>(
        "/admin/departments",
        parsed,
    );
    return res.data;
};

export const getDetailDepartmentApi = async (
    id: number,
): Promise<ApiResponse<Department>> => {
    const res = await axiosInstance.get<ApiResponse<Department>>(
        `/admin/departments/${id}`,
    );
    return res.data;
};

export const updateDepartmentApi = async (
    id: number,
    payload: UpdateDepartmentForm,
): Promise<ApiResponse<Department>> => {
    const parsed = updateDepartmentSchema.parse(payload);
    const res = await axiosInstance.put<ApiResponse<Department>>(
        `/admin/departments/${id}`,
        parsed,
    );
    return res.data;
};

export const deleteDepartmentApi = async (
    id: number,
): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(
        `/admin/departments/${id}`,
    );
    return res.data;
};