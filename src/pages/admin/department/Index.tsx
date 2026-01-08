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
import {Funnel, Loader2, Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {departmentService} from "@/services/department.ts";

export default function Departments() {
    const navigate = useNavigate();
    const {
        data: departments = [],
        isLoading,
        isError,
        error,
    } = departmentService.useList();

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
                        <h1 className="text-md font-semibold">Manage Departments</h1>
                        <p className="text-sm text-muted-foreground">
                            Organize and maintain your company departments efficiently.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                        >
                            <Funnel size={20} />
                        </Button>
                        <Button
                            onClick={() => navigate("/admin/departments/create")}
                            variant="default"
                            className="flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add New Department
                        </Button>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of all departments in the company.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead className="text-right">Employee</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow
                                    key={dept.code}
                                    onClick={() =>
                                        navigate(`/admin/departments/${dept.id}/edit`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{dept.code}</TableCell>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>{dept.manager.name}</TableCell>
                                    <TableCell className="text-right">{dept.employee_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total Departments</TableCell>
                                <TableCell className="text-right">{departments.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    )
}