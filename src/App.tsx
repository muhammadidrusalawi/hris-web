import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/login.tsx";
import AdminDashboard from "@/pages/admin/Dashboard.tsx";
import EmployeeDashboard from "@/pages/employee/Dashboard.tsx";
import {AuthProvider} from "@/context/auth-provider.tsx";
import ProtectedRoute from "@/middleware/protected-route.tsx";
import LoginWithEmployeeCode from "@/pages/auth/login-with-code.tsx";
import RootRedirect from "@/pages/root-redirect.tsx";
import GuestRoute from "@/middleware/guest-route.tsx";
import Departments from "@/pages/admin/department/Index.tsx";
import Positions from "@/pages/admin/position/Index.tsx";
import CreatePosition from "@/pages/admin/position/Create.tsx";
import EditPosition from "@/pages/admin/position/Edit.tsx";
import CreateDepartment from "@/pages/admin/department/Create.tsx";
import Employees from "@/pages/admin/employee/Index.tsx";
import CreateEmployee from "@/pages/admin/employee/Create.tsx";
import EditEmployee from "@/pages/admin/employee/Edit.tsx";
import EditDepartment from "@/pages/admin/department/Edit.tsx";

export default function App(){
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<RootRedirect />} />

                    <Route element={<GuestRoute />}>
                        <Route path="/auth/sign-in" element={<Login />} />
                        <Route
                            path="/auth/sign-in-with-code"
                            element={<LoginWithEmployeeCode />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/departments" element={<Departments />} />
                        <Route path="/admin/departments/create" element={<CreateDepartment />} />
                        <Route path="/admin/departments/:id/edit" element={<EditDepartment />} />
                        <Route path="/admin/positions" element={<Positions />} />
                        <Route path="/admin/positions/create" element={<CreatePosition />} />
                        <Route path="/admin/positions/:id/edit" element={<EditPosition />} />
                        <Route path="/admin/employees" element={<Employees />} />
                        <Route path="/admin/employees/create" element={<CreateEmployee />} />
                        <Route path="/admin/employees/:id/edit" element={<EditEmployee />} />
                    </Route>

                    <Route
                        element={<ProtectedRoute allowedRoles={["employee"]} />}
                    >
                        <Route
                            path="/employee/dashboard"
                            element={<EmployeeDashboard />}
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    )
}