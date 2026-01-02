import React, { useState, useEffect } from "react";
import {getCookie, removeCookie, setCookie} from "@/hooks/use-cookie.ts";
import { AuthContext } from "@/hooks/use-auth";
import {toast} from "react-toastify";
import {logoutApi} from "@/api/auth.ts";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    initialized: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children,}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        const storedToken = getCookie("token");
        const storedUser = getCookie("user");

        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch {
                removeCookie("user");
            }
        }

        setInitialized(true);
    }, []);

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        setCookie("token", authToken);
        setCookie("user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            const res = await logoutApi()
            toast.success(res.message)
        } catch {
            toast.error("Logout failed")
        } finally {
            setUser(null)
            setToken(null)
            removeCookie("token")
            removeCookie("user")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                initialized,
                isAuthenticated: initialized && !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};