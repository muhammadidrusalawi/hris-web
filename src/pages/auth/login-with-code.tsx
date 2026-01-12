import AuthLayout from "@/layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Loader2, Mail} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {authService} from "@/services/auth";
import {
    type LoginWithEmployeeCodeForm,
    loginWithEmployeeCodeSchema
} from "@/schemas/auth/login-with-employee-code-schema.ts";

export default function LoginWithEmployeeCode() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginWithEmployeeCodeForm>({
        resolver: zodResolver(loginWithEmployeeCodeSchema),
    });

    const { mutate, isPending } = authService.useLoginWithEmployeeCode();

    const onSubmit = (data: LoginWithEmployeeCodeForm) => {
        mutate(data, {
            onSuccess: (res) => {
                reset();

                navigate(
                    res.data.user.role === "admin"
                        ? "/admin/dashboard"
                        : "/employee/dashboard"
                );
            },
        });
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
                    disabled={isPending}
                    className="w-full"
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Sign In"
                    )}
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