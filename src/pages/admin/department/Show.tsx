import { useParams, useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeft } from "lucide-react";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";

const departments = [
    { code: "DEP001", name: "Human Resources", manager: "Alice Johnson", employees: 12 },
    { code: "DEP002", name: "Finance", manager: "Bob Smith", employees: 8 },
    { code: "DEP003", name: "IT", manager: "Charlie Brown", employees: 15 },
    { code: "DEP004", name: "Marketing", manager: "Diana Prince", employees: 10 },
    { code: "DEP005", name: "Sales", manager: "Edward Norton", employees: 20 },
];

const statusOptions = ["Contract", "Intern", "Permanent"];

function randomStatus() {
    return statusOptions[Math.floor(Math.random() * statusOptions.length)];
}

export default function ShowDepartment() {
    const { code } = useParams();
    const navigate = useNavigate();

    const department = departments.find(d => d.code === code);

    if (!department) {
        return <div className="p-8 text-red-500 text-center">Department not found</div>;
    }

    return (
        <DashboardLayout>
            <div className="flex w-full h-full flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{department.name}</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Managed by {department.manager}. Contains {department.employees} employees.
                        </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/admin/departments")}>
                        <ChevronLeft size={20} /> Back to List
                    </Button>
                </div>

                <Table>
                    <TableCaption className="text-sm text-muted-foreground">
                        Employees in {department.name} Department (dummy)
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: department.employees }).map((_, idx) => {
                            const joinDate = new Date();
                            joinDate.setMonth(joinDate.getMonth() - idx); // dummy join date
                            return (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{`EMP${String(idx + 1).padStart(3, "0")}`}</TableCell>
                                    <TableCell>{`Employee ${idx + 1}`}</TableCell>
                                    <TableCell>{`Position ${idx + 1}`}</TableCell>
                                    <TableCell>{joinDate.toLocaleDateString()}</TableCell>
                                    <TableCell>{randomStatus()}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    );
}