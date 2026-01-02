import {type LoginForm, loginSchema} from "@/schemas/auth/login-schema.ts";
import type {ApiResponse} from "@/types/api.ts";
import type {LoginResponse} from "@/types/auth.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import {
    type LoginWithEmployeeCodeForm,
    loginWithEmployeeCodeSchema
} from "@/schemas/auth/login-with-employee-code-schema.ts";

export const loginApi = async (
    payload: LoginForm,
): Promise<ApiResponse<LoginResponse>> => {
    const parsed = loginSchema.parse(payload);

    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        parsed,
    );
    return res.data;
};

export const loginWithEmployeeCodeApi = async (
    payload: LoginWithEmployeeCodeForm,
): Promise<ApiResponse<LoginResponse>> => {
    const parsed = loginWithEmployeeCodeSchema.parse(payload);

    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
        "/auth/login-with-code",
        parsed,
    );
    return res.data;
};

export const logoutApi = async (): Promise<ApiResponse<void>> => {
    const res = await axiosInstance.post<ApiResponse<void>>("/auth/logout");
    return res.data;
};
