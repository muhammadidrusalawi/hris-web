import axiosInstance from "@/utils/axios-instance.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {Employee, EmployeesResponse} from "@/types/employee.ts";
import {type CreateEmployeeForm, createEmployeeSchema} from "@/schemas/employee/create-employee-schema.ts";
import {type UpdateEmployeeForm, updateEmployeeSchema} from "@/schemas/employee/update-employee-schema.ts";

export const listEmployeeApi = async (): Promise<ApiResponse<EmployeesResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<EmployeesResponse>>("/admin/employees");
    return res.data;
};

export const createEmployeeApi = async (
    payload: CreateEmployeeForm,
): Promise<ApiResponse<Employee>> => {
    const parsed = createEmployeeSchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Employee>>(
        "/admin/employees",
        parsed,
    );
    return res.data;
};

export const getDetailEmployeeApi = async (
    id: string,
): Promise<ApiResponse<Employee>> => {
    const res = await axiosInstance.get<ApiResponse<Employee>>(
        `/admin/employees/${id}`,
    );
    return res.data;
};

export const updateEmployeeApi = async (
    id: string,
    payload: UpdateEmployeeForm,
): Promise<ApiResponse<Employee>> => {
    const parsed = updateEmployeeSchema.parse(payload);
    const res = await axiosInstance.put<ApiResponse<Employee>>(
        `/admin/employees/${id}`,
        parsed,
    );
    return res.data;
};

export const deleteEmployeeApi = async (
    id: string,
): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(
        `/admin/employees/${id}`,
    );
    return res.data;
};