import React, { useState, useEffect } from "react";
import { getCookie, removeCookie, setCookie } from "@/hooks/use-cookie.ts";
import { AuthContext } from "@/hooks/use-auth.ts";
import type { User } from "@/types/user.ts";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (payload: Partial<User>) => void;
    isAuthenticated: boolean;
    initialized: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    const updateUser = (payload: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updatedUser = { ...prev, ...payload };
            setCookie("user", JSON.stringify(updatedUser));

            return updatedUser;
        });
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        removeCookie("token");
        removeCookie("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                updateUser,
                initialized,
                isAuthenticated: initialized && !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};