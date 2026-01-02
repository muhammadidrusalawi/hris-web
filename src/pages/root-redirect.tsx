import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function RootRedirect() {
    const { user, isAuthenticated, initialized } = useAuth();

    if (!initialized) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return (
        <Navigate
            to={
                user.role === "admin"
                    ? "/admin/dashboard"
                    : "/employee/dashboard"
            }
            replace
        />
    );
}