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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                    {[
                        { label: "Total Quota", value: balanceData?.leave_balance?.total, icon: Users, color: "blue" },
                        { label: "Used", value: balanceData?.leave_balance?.used, icon: Check, color: "emerald" },
                        { label: "Remaining", value: balanceData?.leave_balance?.remaining, icon: Clock, color: "orange" },
                        { label: "Pending", value: balanceData?.pending_leaves, icon: Bell, color: "purple" },
                    ].map((stat, i) => (
                        <div key={i} className="group relative cursor-pointer">
                            <div className="relative bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-500 ease-out group-hover:bg-slate-50/50 group-hover:border-slate-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden">

                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-${stat.color}-500 group-hover:shadow-sm transition-all duration-500 group-hover:-translate-y-1`}>
                                            <stat.icon size={20} strokeWidth={2} />
                                        </div>

                                        <div className="flex flex-col items-end pt-1">
                                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">Status</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-${stat.color}-500 transition-colors duration-500`} />
                                                <span className="text-[10px] font-bold text-slate-700">Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider transition-colors duration-500 group-hover:text-slate-600">
                                            {stat.label}
                                        </h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-4xl font-light tracking-tighter text-slate-900 transition-all duration-500 group-hover:scale-[1.02] origin-left">
                                                {stat.value ?? "0"}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-300 uppercase">
                                                {stat.label === "Pending" ? "Request" : "Days"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            </div>
                        </div>
                    ))}
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
                                <TableHead>Total</TableHead>
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
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(leave.end_date).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{leave.total_days} days</TableCell>
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