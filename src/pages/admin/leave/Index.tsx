import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Loader2, Search} from "lucide-react";
import {leaveService} from "@/services/leave.ts";
import {Input} from "@/components/ui/input.tsx";
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
import {useNavigate} from "react-router-dom";

export default function Leaves(){
    const navigate = useNavigate();
    const {
        data: leaveBalances = [],
        isLoading,
        isError,
        error,
    } = leaveService.useListLeaveBalanceFromAdmin();

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
                        <h1 className="text-md font-semibold">Employee Leave Balances</h1>
                        <p className="text-sm text-muted-foreground">
                            Leave quota summary per employee for selected year
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-96">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                type="text"
                                placeholder="Search by date or name..."
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of all employee attendance records.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Employee Code</TableHead>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Used</TableHead>
                                <TableHead>Remaining</TableHead>
                                <TableHead className="text-right">Pending</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaveBalances.map((item) => (
                                <TableRow
                                    key={item.employee.id}
                                    onClick={() =>
                                        navigate(`/admin/leaves/employee/${item.employee.id}`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{item.leave_balance?.year ?? "—"}</TableCell>
                                    <TableCell>{item.employee.code}</TableCell>
                                    <TableCell>{item.employee.name}</TableCell>
                                    <TableCell>{item.employee.department ?? "—"}</TableCell>
                                    <TableCell>{item.employee.position ?? "—"}</TableCell>
                                    <TableCell>{item.leave_balance?.total ?? "—"}</TableCell>
                                    <TableCell>{item.leave_balance?.used ?? "—"}</TableCell>
                                    <TableCell>
                                        {item.leave_balance?.remaining ?? (
                                            <span className="text-xs text-muted-foreground">
                                                Not generated
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.pending_leaves > 0 ? (
                                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                                {item.pending_leaves}
                                            </span>
                                        ) : (
                                            "0"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={8}>Total Records</TableCell>
                                <TableCell className="text-right">{leaveBalances.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    )
}