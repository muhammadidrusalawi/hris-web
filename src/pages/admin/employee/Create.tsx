import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {employeeService} from "@/services/employee.ts";
import {type CreateEmployeeForm, createEmployeeSchema} from "@/schemas/employee/create-employee-schema.ts";
import {departmentService} from "@/services/department.ts";
import {positionService} from "@/services/position.ts";
import {DatePicker} from "@/components/ui/date-picker.tsx";

export default function CreateEmployee() {
    const navigate = useNavigate();
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
    const createEmployee = employeeService.useCreate();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateEmployeeForm>({
        resolver: zodResolver(createEmployeeSchema),
    });

    const onSubmit = async (data: CreateEmployeeForm) => {
        try {
            const res = await createEmployee.mutateAsync(data);

            if (res.success && res.data) {
                navigate("/admin/employees");
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
                        <h1 className="text-md font-semibold">Create New Employee</h1>
                        <p className="text-sm text-muted-foreground">
                            Provide the necessary details to create a new employee.
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/admin/employees")}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft size={18} /> Back to List
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
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

                    <div>
                        <Label htmlFor="join_date">Join Date</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Controller
                                name="join_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            {errors.join_date?.message && (
                                <p className="text-red-500 text-sm">
                                    {typeof errors.join_date.message === "string"
                                        ? errors.join_date.message
                                        : "Invalid join date"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-3 w-full flex justify-end">
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