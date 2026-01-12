import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import type {Attendance} from "@/types/attendance.ts";
import {
    createAttendanceFromEmployeeApi, listAttendanceFromAdminApi,
    listAttendanceFromEmployeeApi,
    updateAttendanceFromEmployeeApi
} from "@/api/attendance.ts";
import {toast} from "react-toastify";
import type {CreateAttendanceForm} from "@/schemas/attendance/create-attendance-schema.ts";
import type {UpdateAttendanceForm} from "@/schemas/attendance/update-attendace-schema.ts";

export const attendanceService = {
    useListFromAdmin() {
        const options: UseQueryOptions<Attendance[], Error> = {
            queryKey: ["attendances"],
            queryFn: async () => {
                const res = await listAttendanceFromAdminApi();
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

    useListFromEmployee() {
        const options: UseQueryOptions<Attendance[], Error> = {
            queryKey: ["attendances"],
            queryFn: async () => {
                const res = await listAttendanceFromEmployeeApi();
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

    useCreateFromEmployee() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (payload: CreateAttendanceForm) => createAttendanceFromEmployeeApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["attendances"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid attendances data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useUpdateFromEmployee() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({id, payload,}: {
                id: number;
                payload: UpdateAttendanceForm;
            }) => updateAttendanceFromEmployeeApi(id, payload),
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient
                    .invalidateQueries({ queryKey: ["attendances"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid attendances data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },
}