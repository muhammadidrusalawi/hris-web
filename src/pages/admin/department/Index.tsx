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
import {Funnel, Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";

const departments = [
    { code: "DEP001", name: "Human Resources", manager: "Alice Johnson", employees: 12 },
    { code: "DEP002", name: "Finance", manager: "Bob Smith", employees: 8 },
    { code: "DEP003", name: "IT", manager: "Charlie Brown", employees: 15 },
    { code: "DEP004", name: "Marketing", manager: "Diana Prince", employees: 10 },
    { code: "DEP005", name: "Sales", manager: "Edward Norton", employees: 20 },
    { code: "DEP006", name: "Customer Support", manager: "Fiona Adams", employees: 18 },
    { code: "DEP007", name: "Logistics", manager: "George Clarke", employees: 14 },
    { code: "DEP008", name: "Procurement", manager: "Helen White", employees: 9 },
    { code: "DEP009", name: "Legal", manager: "Ian Black", employees: 5 },
    { code: "DEP010", name: "Research & Development", manager: "Jane Foster", employees: 22 },
    { code: "DEP011", name: "Quality Assurance", manager: "Kevin Lee", employees: 11 },
    { code: "DEP012", name: "Training", manager: "Laura Green", employees: 7 },
    { code: "DEP013", name: "Public Relations", manager: "Michael Scott", employees: 6 },
    { code: "DEP014", name: "Security", manager: "Nancy Drew", employees: 13 },
    { code: "DEP015", name: "Maintenance", manager: "Oscar Wilde", employees: 8 }
];

export default function Departments() {
    const navigate = useNavigate();

    const handleRowClick = (code: string) => {
        navigate(`/admin/departments/${code}`);
    };

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
                                    onClick={() => handleRowClick(dept.code)}
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{dept.code}</TableCell>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>{dept.manager}</TableCell>
                                    <TableCell className="text-right">{dept.employees}</TableCell>
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