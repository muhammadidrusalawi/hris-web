import AuthLayout from "@/layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type LoginWithEmployeeCodeForm,
    loginWithEmployeeCodeSchema,
} from "@/schemas/auth/login-with-employee-code-schema";
import { loginWithEmployeeCodeService } from "@/services/auth";
import { toast } from "react-toastify";

export default function LoginWithEmployeeCode() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginWithEmployeeCodeForm>({
        resolver: zodResolver(loginWithEmployeeCodeSchema),
    });

    const onSubmit = async (data: LoginWithEmployeeCodeForm) => {
        try {
            const res = await loginWithEmployeeCodeService(data);
            if (!res.success || !res.data) {
                toast.error(res.message);
                return;
            }

            login(res.data.user, res.data.token);
            navigate("/employee/dashboard");

            toast.success(res.message);
            reset();
        } catch (err: unknown) {
            const error = err as {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };

    return (
        <AuthLayout
            title="Sign In to Your Account"
            subtitle="Sign in using your employee code"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="employee_code">Employee Code</Label>
                    <div className="relative mt-1 flex flex-col gap-1">
                        <Input
                            type="text"
                            {...register("employee_code")}
                            placeholder="Enter your employee code"
                        />
                        {errors.employee_code && (
                            <p className="text-red-500 text-sm">{errors.employee_code.message}</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    Sign In
                </Button>
            </form>

            <div className="flex items-center">
                <div className="flex-grow border-t" />
                <span className="px-3 text-xs text-gray-500">Or</span>
                <div className="flex-grow border-t" />
            </div>

            <Button
                variant="outline"
                className="flex w-full gap-2"
                onClick={() => navigate("/auth/sign-in")}
            >
                <Mail className="h-4 w-4" />
                Sign In with Email
            </Button>
        </AuthLayout>
    );
}