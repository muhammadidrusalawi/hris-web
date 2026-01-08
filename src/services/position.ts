import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import type {Position} from "@/types/position.ts";
import {
    createPositionApi,
    deletePositionApi,
    getDetailPositionApi,
    listPositionApi,
    updatePositionApi
} from "@/api/position.ts";
import type {CreatePositionForm} from "@/schemas/position/create-position-schema.ts";
import { toast } from "react-toastify";
import type {UpdatePositionForm} from "@/schemas/position/update-position-schema.ts";

export const positionService = {
    useList() {
        const options: UseQueryOptions<Position[], Error> = {
            queryKey: ["positions"],
            queryFn: async () => {
                const res = await listPositionApi();
                return res.data ?? [];
            },
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
        };

        return useQuery(options);
    },

    useCreate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (payload: CreatePositionForm) => createPositionApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["positions"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid position data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDetail(id: number) {
        return useQuery({
            queryKey: ["positions", id],
            queryFn: async (): Promise<Position> => {
                const res = await getDetailPositionApi(id);
                return res.data;
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
        });
    },

    useUpdate() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({id, payload,}: {
                id: number;
                payload: UpdatePositionForm;
            }) => updatePositionApi(id, payload),
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient
                    .invalidateQueries({ queryKey: ["positions"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid position data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: number) => deletePositionApi(id),
            onSuccess: async () => {
                void queryClient.invalidateQueries({ queryKey: ["positions"] });
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "An error occurred");
            },
        });
    },
};