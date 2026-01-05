import axiosInstance from "@/utils/axios-instance.ts";
import type {Position, PositionsResponse} from "@/types/position.ts";
import type {ApiResponse} from "@/types/api.ts";
import {type CreatePositionForm, createPositionSchema} from "@/schemas/position/create-position-schema.ts";
import {type UpdatePositionForm, updatePositionSchema} from "@/schemas/position/update-position-schema.ts";

export const listPositionApi = async (): Promise<ApiResponse<PositionsResponse>> => {
    const res =
        await axiosInstance.get<ApiResponse<PositionsResponse>>("/admin/positions");
    return res.data;
};

export const createPositionApi = async (
    payload: CreatePositionForm,
): Promise<ApiResponse<Position>> => {
    const parsed = createPositionSchema.parse(payload);
    const res = await axiosInstance.post<ApiResponse<Position>>(
        "/admin/positions",
        parsed,
    );
    return res.data;
};

export const getDetailPositionApi = async (
    id: number,
): Promise<ApiResponse<Position>> => {
    const res = await axiosInstance.get<ApiResponse<Position>>(
        `/admin/positions/${id}`,
    );
    return res.data;
};

export const updatePositionApi = async (
    id: number,
    payload: UpdatePositionForm,
): Promise<ApiResponse<Position>> => {
    const parsed = updatePositionSchema.parse(payload);
    const res = await axiosInstance.put<ApiResponse<Position>>(
        `/admin/positions/${id}`,
        parsed,
    );
    return res.data;
};

export const deletePositionApi = async (
    id: number,
): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(
        `/admin/positions/${id}`,
    );
    return res.data;
};