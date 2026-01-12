import type {LoginForm} from "@/schemas/auth/login-schema.ts";
import {getProfileApi, loginApi, loginWithEmployeeCodeApi, logoutApi, updateProfileApi} from "@/api/auth.ts";
import type {LoginWithEmployeeCodeForm} from "@/schemas/auth/login-with-employee-code-schema.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import type { User } from "@/types/user";
import type {UpdateProfileForm} from "@/schemas/auth/update-profile-schema.ts";
import {useAuth} from "@/hooks/use-auth.ts";

export const authService = {
    useLogin() {
        const { login } = useAuth();

        return useMutation({
            mutationFn: (payload: LoginForm) => loginApi(payload),

            onSuccess: (res) => {
                login(res.data.user, res.data.token);
                toast.success(res.message);
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Login failed");
            },
        });
    },

    useLoginWithEmployeeCode() {
        const { login } = useAuth();

        return useMutation({
            mutationFn: (payload: LoginWithEmployeeCodeForm) =>
                loginWithEmployeeCodeApi(payload),

            onSuccess: (res) => {
                login(res.data.user, res.data.token);
                toast.success(res.message);
            },

            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Login failed");
            },
        });
    },

    useProfile() {
        return useQuery({
            queryKey: ["profile"],
            queryFn: async (): Promise<User> => {
                const res = await getProfileApi();
                return res.data;
            },
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        });
    },

    useUpdateProfile() {
        const queryClient = useQueryClient();
        const { updateUser } = useAuth();

        return useMutation({
            mutationFn: ({payload,}: {
                payload: UpdateProfileForm;
            }) => updateProfileApi(payload),
            onSuccess: (res) => {
                updateUser(res.data);
                queryClient
                    .invalidateQueries({ queryKey: ["profile"] })
                    .catch(() => {});
            },

            onError: (err: any) => {
                if (err.name === "ZodError") {
                    toast.error("Invalid user profile data");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            },
        });
    },

    useLogout() {
        const { logout } = useAuth();
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: () => logoutApi(),
            onSuccess: (res) => {
                queryClient.clear();
                logout();
                toast.success(res.message);
            },

            onError: (err: any) => {
                queryClient.clear();
                logout();

                toast.error(
                    err?.response?.data?.message || "Logged out"
                );
            },
        });
    },
}