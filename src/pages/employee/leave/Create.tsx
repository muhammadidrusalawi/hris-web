import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Loader2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {DatePicker} from "@/components/ui/date-picker.tsx";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {leaveService} from "@/services/leave.ts";
import {type CreateLeaveForm, createLeaveSchema} from "@/schemas/leave/create-leave-schema.ts";

export default function CreateLeaveEmployee(){
    const navigate = useNavigate();
    const createLeave = leaveService.useCreateLeaveFromEmployee();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateLeaveForm>({
        resolver: zodResolver(createLeaveSchema),
    });

    const onSubmit = async (data: CreateLeaveForm) => {
        try {
            const res = await createLeave.mutateAsync(data);

            if (res.success && res.data) {
                navigate("/employee/leaves");
            } else {
                reset();
            }
        } catch {
            reset();
        }
    };

    return (
        <DashboardLayout>
            <div className="flex w-full h-fit bg-white border rounded-xl flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">Apply New Leave</h1>
                        <p className="text-sm text-muted-foreground">
                            Fill up the form to apply for a new leave and wait for approval.
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/employee/leaves")}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft size={18} /> Back to List
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Controller
                                name="start_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            {errors.start_date?.message && (
                                <p className="text-red-500 text-sm">
                                    {typeof errors.start_date.message === "string"
                                        ? errors.start_date.message
                                        : "Invalid start date"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Controller
                                name="end_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            {errors.end_date?.message && (
                                <p className="text-red-500 text-sm">
                                    {typeof errors.end_date.message === "string"
                                        ? errors.end_date.message
                                        : "Invalid end date"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="type">Select Type</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <select
                                {...register("type")}
                                className="w-full px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select type of leave</option>
                                <option value="annual">Annual</option>
                                <option value="sick">Sick</option>
                                <option value="unpaid">Unpaid</option>
                                <option value="other">Other</option>
                            </select>

                            {errors.type && (
                                <p className="text-red-500 text-sm">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="reason">Reason</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                {...register("reason")}
                                placeholder="Type your reason"
                            />
                            {errors.reason && (
                                <p className="text-red-500 text-sm">{errors.reason.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2 w-full flex justify-end">
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