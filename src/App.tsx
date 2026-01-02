import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/login.tsx";
import AdminDashboard from "@/pages/admin/Dashboard.tsx";
import EmployeeDashboard from "@/pages/employee/Dashboard.tsx";
import {AuthProvider} from "@/context/auth-provider.tsx";
import ProtectedRoute from "@/middleware/protected-route.tsx";
import LoginWithEmployeeCode from "@/pages/auth/login-with-code.tsx";
import RootRedirect from "@/pages/root-redirect.tsx";
import GuestRoute from "@/middleware/guest-route.tsx";

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
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
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