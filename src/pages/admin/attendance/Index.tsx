import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Loader2, Search} from "lucide-react";
import {attendanceService} from "@/services/attendance.ts";
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

export default function Attendances(){
    const {
        data: attendances = [],
        isLoading,
        isError,
        error,
    } = attendanceService.useListFromAdmin();

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
                        <h1 className="text-md font-semibold">Employee Attendances</h1>
                        <p className="text-sm text-muted-foreground">
                            List of all employee attendance records
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
                                <TableHead>Employee Code</TableHead>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Clock In</TableHead>
                                <TableHead className="text-right">Clock Out</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendances.map((atd) => (
                                <TableRow
                                    key={atd.id}
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{atd.employee_code}</TableCell>
                                    <TableCell>{atd.employee_name}</TableCell>
                                    <TableCell>{atd.position}</TableCell>
                                    <TableCell>{atd.date}</TableCell>
                                    <TableCell>{atd.clock_in}</TableCell>

                                    <TableCell className="text-right">
                                        {atd.clock_out ? (
                                            atd.clock_out
                                        ) : (
                                            <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-full">
                                                Not Out
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={7}>Total Records</TableCell>
                                <TableCell className="text-right">{attendances.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    )
}