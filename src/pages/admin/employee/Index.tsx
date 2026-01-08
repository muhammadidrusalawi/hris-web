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
import {Funnel, Loader2, Plus, Search} from "lucide-react";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {employeeService} from "@/services/employee.ts";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate} from "react-router-dom";

export default function Employees() {
    const navigate = useNavigate();
    const {
        data: employees = [],
        isLoading,
        isError,
        error,
    } = employeeService.useList();

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
            <div className="flex w-full h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-md font-semibold">Manage Employees</h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage employee records across the organization.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                        >
                            <Funnel size={20} />
                        </Button>
                        <div className="relative w-96">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                type="text"
                                placeholder="Search employee..."
                                className="pl-9 py-2.5"
                            />
                        </div>
                        <Button
                            variant="default"
                            onClick={() => navigate("/admin/employees/create")}
                            className="flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add New Employee
                        </Button>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of all departments in the company.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRow
                                    key={emp.id}
                                    onClick={() =>
                                        navigate(`/admin/employees/${emp.id}/edit`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{emp.employee_code}</TableCell>
                                    <TableCell>{emp.name}</TableCell>
                                    <TableCell>{emp.department?.name}</TableCell>
                                    <TableCell>{emp.position?.name}</TableCell>
                                    <TableCell>{emp.user?.email}</TableCell>
                                    <TableCell>{emp.join_date}</TableCell>
                                    <TableCell className="text-right">{emp.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={6}>Total Employees</TableCell>
                                <TableCell className="text-right">{employees.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    )
}