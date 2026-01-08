import axiosInstance from "@/utils/axios-instance.ts";
import type {UsersResponse} from "@/types/user.ts";
import type {ApiResponse} from "@/types/api.ts";

export const listUserManagerApi = async (): Promise<ApiResponse<UsersResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<UsersResponse>>("/admin/users/manager");
    return res.data;
};