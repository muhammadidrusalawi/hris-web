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
import {Loader2, Plus, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {positionService} from "@/services/position.ts";
import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function Positions() {
    const navigate = useNavigate();
    const {
        data: positions = [],
        isLoading,
        isError,
        error,
    } = positionService.useList();

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
                        <h1 className="text-md font-semibold">Manage Positions</h1>
                        <p className="text-sm text-muted-foreground">
                            Organize and maintain your company positions efficiently.
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
                                placeholder="Search position..."
                                className="pl-9"
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/admin/positions/create")}
                            variant="default"
                            className="flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add New Position
                        </Button>
                    </div>
                </div>

                <div>
                    <Table>
                        <TableCaption>A list of all positions in the company.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Position Name</TableHead>
                                <TableHead className="text-right">Total Employee</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {positions.map((position) => (
                                <TableRow
                                    key={position.id}
                                    onClick={() =>
                                        navigate(`/admin/positions/${position.id}/edit`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">{position.name}</TableCell>
                                    <TableCell className="text-right">{position.employee_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total Departments</TableCell>
                                <TableCell className="text-right">{positions.length}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
        // <SidebarProvider>
        //     <AppSidebar />
        //     <SidebarInset>
        //         <header className="flex h-16 shrink-0 items-center gap-2">
        //             <div className="flex items-center gap-2 px-4">
        //                 <SidebarTrigger className="-ml-1" />
        //                 <Separator
        //                     orientation="vertical"
        //                     className="mr-2 data-[orientation=vertical]:h-4"
        //                 />
        //                 <Breadcrumb>
        //                     <BreadcrumbList>
        //                         <BreadcrumbItem className="hidden md:block">
        //                             <BreadcrumbLink href="/admin/positions">
        //                                 Positions
        //                             </BreadcrumbLink>
        //                         </BreadcrumbItem>
        //                         <BreadcrumbSeparator className="hidden md:block" />
        //                         <BreadcrumbItem>
        //                             <BreadcrumbPage>List</BreadcrumbPage>
        //                         </BreadcrumbItem>
        //                     </BreadcrumbList>
        //                 </Breadcrumb>
        //             </div>
        //         </header>
        //         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        //             <div className="flex items-center justify-between">
        //                 <div>
        //                     <h1 className="text-md font-semibold">Manage Positions</h1>
        //                     <p className="text-sm text-muted-foreground">
        //                         Organize and maintain your company positions efficiently.
        //                     </p>
        //                 </div>
        //
        //                 <div className="flex items-center gap-2">
        //                     <div className="relative w-96">
        //                         <Search
        //                             size={16}
        //                             className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        //                         />
        //                         <Input
        //                             type="text"
        //                             placeholder="Search position..."
        //                             className="pl-9"
        //                         />
        //                     </div>
        //                     <CreatePosition />
        //                     {/*<Button*/}
        //                     {/*    variant="default"*/}
        //                     {/*    className="flex items-center gap-2"*/}
        //                     {/*>*/}
        //                     {/*    <Plus size={20} />*/}
        //                     {/*    Add New Position*/}
        //                     {/*</Button>*/}
        //                 </div>
        //             </div>
        //
        //             <div>
        //                 <Table>
        //                     <TableCaption>A list of all positions in the company.</TableCaption>
        //                     <TableHeader>
        //                         <TableRow>
        //                             <TableHead>Position Name</TableHead>
        //                             <TableHead className="text-right">Total Employee</TableHead>
        //                         </TableRow>
        //                     </TableHeader>
        //                     <TableBody>
        //                         {positions.map((position) => (
        //                             <TableRow
        //                                 key={position.id}
        //                                 className="cursor-pointer"
        //                             >
        //                                 <TableCell className="font-medium">{position.name}</TableCell>
        //                                 <TableCell className="text-right">99</TableCell>
        //                             </TableRow>
        //                         ))}
        //                     </TableBody>
        //                     <TableFooter>
        //                         <TableRow>
        //                             <TableCell colSpan={3}>Total Departments</TableCell>
        //                             <TableCell className="text-right">{positions.length}</TableCell>
        //                         </TableRow>
        //                     </TableFooter>
        //                 </Table>
        //             </div>
        //         </div>
        //     </SidebarInset>
        // </SidebarProvider>
    )
}