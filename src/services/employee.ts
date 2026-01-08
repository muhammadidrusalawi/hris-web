import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import type {Employee} from "@/types/employee.ts";
import {
    createEmployeeApi,
    deleteEmployeeApi,
    getDetailEmployeeApi,
    listEmployeeApi,
    updateEmployeeApi
} from "@/api/employee.ts";
import {toast} from "react-toastify";
import type {CreateEmployeeForm} from "@/schemas/employee/create-employee-schema.ts";
import type {UpdateEmployeeForm} from "@/schemas/employee/update-employee-schema.ts";

export const employeeService = {
    useList() {
        const options: UseQueryOptions<Employee[], Error> = {
            queryKey: ["employees"],
            queryFn: async () => {
                const res = await listEmployeeApi();
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
            mutationFn: (payload: CreateEmployeeForm) => createEmployeeApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["employees"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid employee data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDetail(id: string) {
        return useQuery({
            queryKey: ["employees", id],
            queryFn: async (): Promise<Employee> => {
                const res = await getDetailEmployeeApi(id);
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
                id: string;
                payload: UpdateEmployeeForm;
            }) => updateEmployeeApi(id, payload),
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient
                    .invalidateQueries({ queryKey: ["employees"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid employee data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (id: string) => deleteEmployeeApi(id),
            onSuccess: async () => {
                void queryClient.invalidateQueries({ queryKey: ["employees"] });
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "An error occurred");
            },
        });
    },
}