import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {positionService} from "@/services/position.ts";
import {useForm} from "react-hook-form";
import {type UpdatePositionForm, updatePositionSchema} from "@/schemas/position/update-position-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, Loader2, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "react-toastify";

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
                        <h1 className="text-md font-semibold">Edit Position</h1>
                        <p className="text-sm text-muted-foreground">
                            Update the details of the selected position.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={() =>
                                deletePosition(positionId, {
                                    onSuccess: (res) => {
                                        toast.success(res.message);
                                        navigate("/admin/positions");
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
                            onClick={() => navigate("/admin/positions")}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back to List
                        </Button>
                    </div>
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

                    <div className="w-full flex justify-end">
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