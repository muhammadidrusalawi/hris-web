import type {Department} from "@/types/department.ts";
import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import {
    createDepartmentApi,
    deleteDepartmentApi,
    getDetailDepartmentApi,
    listDepartmentApi,
    updateDepartmentApi
} from "@/api/department.ts";
import {toast} from "react-toastify";
import type {CreateDepartmentForm} from "@/schemas/department/create-department-schema.ts";
import type {UpdateDepartmentForm} from "@/schemas/department/update-department-schema.ts";

export const departmentService = {
    useList() {
        const options: UseQueryOptions<Department[], Error> = {
            queryKey: ["departments"],
            queryFn: async () => {
                const res = await listDepartmentApi();
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
            mutationFn: (payload: CreateDepartmentForm) => createDepartmentApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["departments"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid departments data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDetail(id: number) {
        return useQuery({
            queryKey: ["departments", id],
            queryFn: async (): Promise<Department> => {
                const res = await getDetailDepartmentApi(id);
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
                payload: UpdateDepartmentForm;
            }) => updateDepartmentApi(id, payload),
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient
                    .invalidateQueries({ queryKey: ["departments"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid department data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (id: number) => deleteDepartmentApi(id),

            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: ["departments"] });
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "An error occurred");
            },
        });
    }
}