import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {positionService} from "@/services/position.ts";
import {useForm} from "react-hook-form";
import {type CreatePositionForm, createPositionSchema} from "@/schemas/position/create-position-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export default function CreatePosition() {
    const navigate = useNavigate();
    const createPosition = positionService.useCreate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreatePositionForm>({
        resolver: zodResolver(createPositionSchema),
    });

    const onSubmit = async (data: CreatePositionForm) => {
        try {
            const res = await createPosition.mutateAsync(data);

            if (res.success && res.data) {
                navigate("/admin/positions");
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
                        <h1 className="text-md font-semibold">Create New Position</h1>
                        <p className="text-sm text-muted-foreground">
                            lorem ipsum dolor sit amet
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/admin/positions")}
                        variant="outline"
                        className="flex items-center gap-2"
                        >
                        <ChevronLeft size={18} /> Back to List
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Position Name</Label>
                        <div className="relative mt-1 flex flex-col gap-1">
                            <Input
                                type="text"
                                {...register("name")}
                                placeholder="Software Engineer"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}