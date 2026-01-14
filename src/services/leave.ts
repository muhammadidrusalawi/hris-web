import {useMutation, useQuery, useQueryClient, type UseQueryOptions} from "@tanstack/react-query";
import type {LeaveBalance} from "@/types/leave-balance.ts";
import {
    approveLeaveAdminApi,
    createLeaveEmployeeApi,
    leaveBalanceDetailAdminApi,
    listLeaveBalancesAdminApi,
    listLeaveBalancesEmployeeApi, listLeavesEmployeeApi
} from "@/api/leave.ts";
import type {Leave} from "@/types/leave.ts";
import {toast} from "react-toastify";
import type {CreateLeaveForm} from "@/schemas/leave/create-leave-schema.ts";

export const leaveService = {
    useListLeaveBalanceFromAdmin() {
        const options: UseQueryOptions<LeaveBalance[], Error> = {
            queryKey: ["leaveBalances"],
            queryFn: async () => {
                const res = await listLeaveBalancesAdminApi();
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

    useDetailLeaveBalanceAdmin(id: string) {
        const options: UseQueryOptions<Leave[], Error> = {
            queryKey: ["leaveBalances", id],
            queryFn: async (): Promise<Leave[]> => {
                const res = await leaveBalanceDetailAdminApi(id);
                return res.data ?? [];
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
        };

        return useQuery(options);
    },

    useApproveLeaveByAdmin() {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (id: number) => approveLeaveAdminApi(id),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["leaveBalances"] });
                await queryClient.invalidateQueries({ queryKey: ["leaves"] });
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Failed to approve leave");
            },
        });
    },

    useListLeaveBalanceFromEmployee: (year?: number) => {
        const options: UseQueryOptions<LeaveBalance, Error> = {
            queryKey: ["leaveBalances", year ?? "current"],
            queryFn: async () => {
                const res = await listLeaveBalancesEmployeeApi(year);
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

    useListLeavesFromEmployee: (year?: number) => {
        const options: UseQueryOptions<Leave[], Error> = {
            queryKey: ["leaves", year ?? "current"],
            queryFn: async () => {
                const res = await listLeavesEmployeeApi(year);
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

    useCreateLeaveFromEmployee() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (payload: CreateLeaveForm) => createLeaveEmployeeApi(payload),
            onSuccess: async (res) => {
                toast.success(res.message);
                await queryClient.invalidateQueries({ queryKey: ["leaves", "current"] });
                await queryClient.invalidateQueries({ queryKey: ["leaveBalances", "current"] });
            },
            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid leave data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },
}