import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Loader2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { useNavigate } from "react-router-dom";
import {userManagerService} from "@/services/user.ts";
import {departmentService} from "@/services/department.ts";
import {useForm} from "react-hook-form";
import {type CreateDepartmentForm, createDepartmentSchema} from "@/schemas/department/create-department-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export default function CreateDepartment() {
    const navigate = useNavigate();
    const {
        data: userManagers = [],
        isLoading: isUserManagerLoading,
        isError: isUserManagerError,
    } = userManagerService.useList();

    const createDepartment = departmentService.useCreate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateDepartmentForm>({
        resolver: zodResolver(createDepartmentSchema),
    });

    const onSubmit = async (data: CreateDepartmentForm) => {
        try {
            const res = await createDepartment.mutateAsync(data);

            if (res.success) {
                navigate("/admin/departments");
            } else {
                reset();
            }
        } catch {
            reset();
        }
    };

    return (
        <DashboardLayout>
            <div className="flex w-full h-full flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">Create New Department</h1>
                        <p className="text-sm text-muted-foreground">
                            Provide the required information to add a new department.
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/admin/departments")}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft size={18} /> Back to List
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Department Name</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                {...register("name")}
                                placeholder="Finance"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="manager">Select Manager</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <select
                                {...register("manager_id")}
                                disabled={isUserManagerLoading || isUserManagerError}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                {isUserManagerLoading && (
                                    <option value="">Loading managers...</option>
                                )}

                                {isUserManagerError && (
                                    <option value="">Failed to load managers</option>
                                )}

                                {!isUserManagerLoading && !isUserManagerError && (
                                    <>
                                        <option value="">Select Manager</option>
                                        {userManagers.map((manager) => (
                                            <option
                                                key={manager.id}
                                                value={manager.id}
                                            >
                                                {manager.name} - {manager.email}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            {errors.manager_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.manager_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}