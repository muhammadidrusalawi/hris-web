import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Loader2, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "react-toastify";
import {employeeService} from "@/services/employee.ts";
import {type UpdateEmployeeForm, updateEmployeeSchema} from "@/schemas/employee/update-employee-schema.ts";
import {departmentService} from "@/services/department.ts";
import {positionService} from "@/services/position.ts";

export default function EditEmployee() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const employeeId = String(id);

    const {
        data: departments = [],
        isLoading: isDepartmentLoading,
        isError: isDepartmentError,
    } = departmentService.useList();
    const {
        data: positions = [],
        isLoading: isPositionLoading,
        isError: isPositionError,
    } = positionService.useList();
    const { data: employee, isLoading } =
        employeeService.useDetail(employeeId);

    const updateMutation = employeeService.useUpdate();
    const { mutate: deleteEmployee, isPending: isDeleting } =
        employeeService.useDelete();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateEmployeeForm>({
        resolver: zodResolver(updateEmployeeSchema),
    });

    useEffect(() => {
        if (employee) {
            reset({
                id: employee.id,
                name: employee.name,
                status: employee.status as "active" | "probation" | "intern" | "contract",
                department_id: employee.department?.id,
                position_id: employee.position?.id,
            });
        }
    }, [employee, reset]);

    const onSubmit = async (data: UpdateEmployeeForm) => {
        try {
            const res = await updateMutation.mutateAsync({
                id: employeeId,
                payload: data,
            });

            if (res.success && res.data) {
                navigate("/admin/employees");
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
                        <h1 className="text-md font-semibold">Edit Employee</h1>
                        <p className="text-sm text-muted-foreground">
                            Update the details of the selected employee.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() =>
                                deleteEmployee(employeeId, {
                                    onSuccess: (res) => {
                                        toast.success(res.message);
                                        navigate("/admin/employees");
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
                            onClick={() => navigate("/admin/employees")}
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
                        {...register("id")}
                    />

                    <div>
                        <Label htmlFor="employee_code">Employee Code</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                value={employee?.employee_code || ""}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <Label htmlFor="name">Employee Name</Label>
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
                        <Label htmlFor="email">Email</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="email"
                                value={employee?.user?.email || ""}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="join_date">Join Date</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="date"
                                value={employee?.join_date || ""}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="status">Select Status</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <select
                                {...register("status")}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="probation">Probation</option>
                                <option value="intern">Intern</option>
                                <option value="contract">Contract</option>
                            </select>

                            {errors.status && (
                                <p className="text-red-500 text-sm">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="department">Select Department</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <select
                                {...register("department_id", { valueAsNumber: true })}
                                disabled={isDepartmentLoading || isDepartmentError}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                {isDepartmentLoading && (
                                    <option value="">Loading department data...</option>
                                )}

                                {isDepartmentError && (
                                    <option value="">Failed to load department</option>
                                )}

                                {!isDepartmentLoading && !isDepartmentError && (
                                    <>
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option
                                                key={dept.id}
                                                value={dept.id}
                                            >
                                                {dept.code} - {dept.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            {errors.department_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.department_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="position">Select Position</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <select
                                {...register("position_id", { valueAsNumber: true })}
                                disabled={isPositionLoading || isPositionError}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                {isPositionLoading && (
                                    <option value="">Loading position data...</option>
                                )}

                                {isPositionError && (
                                    <option value="">Failed to load position</option>
                                )}

                                {!isPositionLoading && !isPositionError && (
                                    <>
                                        <option value="">Select Position</option>
                                        {positions.map((position) => (
                                            <option
                                                key={position.id}
                                                value={position.id}
                                            >
                                                {position.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            {errors.department_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.department_id.message}
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
                </form>
            </div>
        </DashboardLayout>
    )
}