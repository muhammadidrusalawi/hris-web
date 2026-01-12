import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {type UpdateProfileForm, updateProfileSchema} from "@/schemas/auth/update-profile-schema";
import {authService} from "@/services/auth.ts";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button.tsx";

export default function UserProfile() {
    const { data: profile, isLoading } = authService.useProfile();
    const updateMutation = authService.useUpdateProfile();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileForm>({
        resolver: zodResolver(updateProfileSchema),
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name,
            });
        }
    }, [profile, reset]);

    const onSubmit = async (data: UpdateProfileForm) => {
        try {
            const res = await updateMutation.mutateAsync({
                payload: data,
            });

            if (res.success && res.data) {
                toast.success(res.message);
            }
        } catch {
            reset();
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex w-full h-full items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex w-full h-full flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">Account Profile</h1>
                        <p className="text-sm text-muted-foreground">
                            Update your account profile.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="email"
                                value={profile?.email}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="name">Account Name</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                {...register("name")}
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="password"
                                {...register("password_confirmation")}
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-sm">
                                    {errors.password_confirmation.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2 w-full flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || updateMutation.isPending}
                        >
                            {isSubmitting || updateMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
