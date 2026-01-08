import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "react-toastify";
import {ChevronLeft, Loader2, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {departmentService} from "@/services/department.ts";
import {type UpdateDepartmentForm, updateDepartmentSchema} from "@/schemas/department/update-department-schema.ts";
import {userManagerService} from "@/services/user.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export default function EditDepartment(){
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const departmentId = Number(id);

    const {
        data: userManagers = [],
        isLoading: isUserManagerLoading,
        isError: isUserManagerError,
    } = userManagerService.useList();
    const { data: department, isLoading } =
        departmentService.useDetail(departmentId);

    const updateMutation = departmentService.useUpdate();
    const { mutate: deleteDepartment, isPending: isDeleting } =
        departmentService.useDelete();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateDepartmentForm>({
        resolver: zodResolver(updateDepartmentSchema),
    });

    useEffect(() => {
        if (department) {
            reset({
                id: department.id,
                name: department.name,
                manager_id: department.manager?.id,
            });
        }
    }, [department, reset]);

    const onSubmit = async (data: UpdateDepartmentForm) => {
        try {
            const res = await updateMutation.mutateAsync({
                id: departmentId,
                payload: data,
            });

            if (res.success && res.data) {
                navigate("/admin/departments");
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
                        <h1 className="text-md font-semibold">Edit Department</h1>
                        <p className="text-sm text-muted-foreground">
                            Update the details of the selected department.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() =>
                                deleteDepartment(departmentId, {
                                    onSuccess: (res) => {
                                        toast.success(res.message);
                                        navigate("/admin/departments");
                                    },
                                })
                            }
                        >
                            {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/departments")}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back to List
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                    <input
                        type="hidden"
                        {...register("id", { valueAsNumber: true })}
                    />

                    <div>
                        <Label htmlFor="department_code">Department Code</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                value={department?.code || ""}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

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

                    <div className="col-span-3 w-full flex justify-end">
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

                    <div className="flex col-span-3 flex-col gap-4">
                        <div>
                            <h1 className="text-md font-bold">{department?.name}</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Managed by {department?.manager.name}
                            </p>
                        </div>

                        <Table>
                            <TableCaption>
                                Employees in {department?.name} Department
                            </TableCaption>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Join Date</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {department?.employees?.length ? (
                                    department.employees.map((emp) => (
                                        <TableRow key={emp.id}>
                                            <TableCell className="font-medium">
                                                {emp.employee_code}
                                            </TableCell>
                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>{emp.position?.name}</TableCell>
                                            <TableCell>{emp.status}</TableCell>
                                            <TableCell>{emp.join_date}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center text-muted-foreground"
                                        >
                                            No employees
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}