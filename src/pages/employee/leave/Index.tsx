import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Bell, Check, ChevronDown, Clock, Loader2, Slash, Users, X} from "lucide-react";
import {leaveService} from "@/services/leave.ts";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function ListLeaveBalanceEmployee(){
    const navigate = useNavigate();
    const [year, setYear] = useState<number | undefined>(undefined);
    const {
        data: balanceData,
        isLoading: isBalanceLoading,
        isError: isBalanceError,
        error: balanceError,
    } = leaveService.useListLeaveBalanceFromEmployee(year);

    const {
        data: leavesData = [],
        isLoading: isLeavesLoading,
        isError: isLeavesError,
        error: leavesError,
    } = leaveService.useListLeavesFromEmployee(year);

    const isLoading = isBalanceLoading || isLeavesLoading;
    const isError = isBalanceError || isLeavesError;
    const error = balanceError || leavesError;

    if (isLoading)
        return (
            <DashboardLayout>
                <div className="h-full w-full flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            </DashboardLayout>
        );

    if (isError)
        return (
            <DashboardLayout>
                <div className="w-full h-full flex items-center justify-center">
                    <p>Error: {(error as Error).message}</p>
                </div>
            </DashboardLayout>
        );

    return (
        <DashboardLayout>
            <div className="flex w-full h-fit flex-col bg-white border rounded-xl gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">{balanceData?.employee.name ?? "Employee Leave Balances"}</h1>
                        <p className="text-sm text-muted-foreground">
                            Leave quota summary for {year}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Button variant="outline">
                                {year ?? new Date().getFullYear()}
                                <ChevronDown />
                            </Button>
                            <select
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            >
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const y = new Date().getFullYear() - i;
                                    return <option key={y} value={y}>{y}</option>;
                                })}
                            </select>
                        </div>

                        <Button
                            onClick={() => navigate("/employee/leaves/create")}
                        >
                            Apply New Leave
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-blue-50 rounded-xl shadow flex items-center gap-4">
                        <Users className="text-blue-500 w-6 h-6" />
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Total Leave</span>
                            <span className="text-xl font-semibold">{balanceData?.leave_balance?.total ?? "—"}</span>
                        </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl shadow flex items-center gap-4">
                        <Check className="text-green-500 w-6 h-6" />
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Used</span>
                            <span className="text-xl font-semibold">{balanceData?.leave_balance?.used ?? "—"}</span>
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl shadow flex items-center gap-4">
                        <Clock className="text-yellow-500 w-6 h-6" />
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Remaining</span>
                            <span className="text-xl font-semibold">{balanceData?.leave_balance?.remaining ?? "—"}</span>
                        </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl shadow flex items-center gap-4">
                        <Bell className="text-purple-500 w-6 h-6" />
                        <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Pending Leaves</span>
                            <span className="text-xl font-semibold">{balanceData?.pending_leaves}</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                    <h2 className="text-md font-semibold">Leave Records</h2>
                    <Table>
                        <TableCaption>List of leaves for {year}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Total Days</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leavesData.map((leave) => (
                                <TableRow key={leave.id}>
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
                                    <TableCell>{leave.total_days}</TableCell>
                                    <TableCell>{leave.reason}</TableCell>
                                    <TableCell className="flex items-center justify-center">
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    )
}