import AuthLayout from "@/layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {IdCardLanyard, Loader2} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginForm, loginSchema } from "@/schemas/auth/login-schema";
import {authService} from "@/services/auth";

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate, isPending } = authService.useLogin();

    const onSubmit = (data: LoginForm) => {
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
            subtitle="Sign in using your email and password"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1 flex flex-col gap-1">
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="john@rhcp.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1 flex flex-col gap-1">
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
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
                onClick={() => navigate("/auth/sign-in-with-code")}
            >
                <IdCardLanyard className="h-4 w-4" />
                Sign In using Employee Code
            </Button>
        </AuthLayout>
    );
}