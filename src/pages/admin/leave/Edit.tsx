import {useNavigate, useParams} from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {Check, ChevronLeft, Clock, Loader2, Slash, X} from "lucide-react";
import { leaveService } from "@/services/leave";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function EditLeave() {
    const navigate = useNavigate();
    const { employeeId } = useParams<{ employeeId: string }>();
    const {
        data: leaves = [],
        isLoading,
        isError,
        error,
    } = leaveService.useDetailLeaveBalanceAdmin(employeeId!);
    const approveMutation = leaveService.useApproveLeaveByAdmin();

    if (isLoading) return (
        <DashboardLayout>
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        </DashboardLayout>
    );

    if (isError) return (
        <DashboardLayout>
            <div className="h-full w-full flex items-center justify-center">
                <p>Error: {(error as Error).message}</p>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <div className="flex w-full h-fit flex-col bg-white border rounded-xl gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">
                            {leaves[0]?.employee?.name ?? "Employee Leave Balances"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {leaves[0]
                                ? `Leave quota summary for ${leaves[0].employee.name} ${leaves[0].employee.code} for selected year`
                                : "Leave quota summary per employee for selected year"}
                        </p>
                    </div>

                    <div className="flex items-center justify-end">

                        <Button
                            type="button"
                            onClick={() => navigate("/admin/leaves")}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back to List
                        </Button>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of all employee attendance records.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee Code</TableHead>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave) => (
                                <TableRow key={leave.id} className="cursor-pointer">
                                    <TableCell>{leave.employee.code}</TableCell>
                                    <TableCell>{leave.employee.name}</TableCell>
                                    <TableCell>{leave.employee.position}</TableCell>
                                    <TableCell className="capitalize">{leave.type}</TableCell>
                                    <TableCell>
                                        {new Date(leave.start_date).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(leave.end_date).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{leave.total_days} Days</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                            leave.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                leave.status === "approved" ? "bg-green-100 text-green-800" :
                                                    leave.status === "rejected" ? "bg-red-100 text-red-800" :
                                                        "bg-gray-100 text-gray-800"
                                        }`}>
                                            {leave.status === "pending" && <Clock className="w-4 h-4" />}
                                            {leave.status === "approved" && <Check className="w-4 h-4" />}
                                            {leave.status === "rejected" && <X className="w-4 h-4" />}
                                            {leave.status === "cancelled" && <Slash className="w-4 h-4" />}
                                            <span className="capitalize">{leave.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{leave.employee.manager?.name ?? "—"}</TableCell>
                                    <TableCell className="flex items-end justify-end gap-2">
                                        <button
                                            onClick={() => approveMutation.mutate(leave.id)}
                                            className="flex items-center gap-1 px-2 py-1 text-green-600 border border-green-600 rounded-full text-xs cursor-pointer"
                                        >
                                            <Check size={14} /> Approve
                                        </button>

                                        <div className="flex items-center gap-1 px-2 py-1 text-red-600 border border-red-600 rounded-full text-xs cursor-pointer">
                                            <X size={14} /> Reject
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={9}>Total Records</TableCell>
                                <TableCell className="text-right">{leaves.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}