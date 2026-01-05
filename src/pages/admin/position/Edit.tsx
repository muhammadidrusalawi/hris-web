import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {positionService} from "@/services/position.ts";
import {useForm} from "react-hook-form";
import {type UpdatePositionForm, updatePositionSchema} from "@/schemas/position/update-position-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

export default function EditPosition() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const positionId = Number(id);

    const { data: position, isLoading } =
        positionService.useDetail(positionId);

    const updateMutation = positionService.useUpdate();
    const { mutate: deletePosition, isPending: isDeleting } =
        positionService.useDelete();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePositionForm>({
        resolver: zodResolver(updatePositionSchema),
    });

    useEffect(() => {
        if (position) {
            reset({
                id: position.id,
                name: position.name,
            });
        }
    }, [position, reset]);

    const onSubmit = async (data: UpdatePositionForm) => {
        try {
            const res = await updateMutation.mutateAsync({
                id: positionId,
                payload: data,
            });

            if (res.success && res.data) {
                navigate("/admin/positions");
            }
        } catch {
            reset();
        }
    };

    const handleDelete = async () => {
        if (!positionId) return;
        if (!confirm("Delete this position?")) return;
            deletePosition(positionId);
            navigate("/admin/positions");
    };


    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="h-full w-full flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex w-full h-full flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">Update Position</h1>
                        <p className="text-sm text-muted-foreground">
                            lorem ipsum dolor sit amet
                        </p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="flex items-center gap-2"
                        disabled={isDeleting}
                    >
                        <Trash2 size={18} /> Delete this
                    </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="hidden"
                        {...register("id", { valueAsNumber: true })}
                    />
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

                    <div className="w-full flex items-center gap-2 justify-end">
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/positions")}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back to List
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || updateMutation.isPending}
                        >
                            {isSubmitting || updateMutation.isPending
                                ? "Submitting..."
                                : "Submit"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    )
}