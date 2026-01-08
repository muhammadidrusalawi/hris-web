import React, { useState, useEffect, useCallback, useRef } from "react";
import { getCookie, removeCookie, setCookie } from "@/hooks/use-cookie";
import { AuthContext } from "@/hooks/use-auth";
import { logoutApi, getMe } from "@/api/auth";
import { User } from "@/types/auth";
import axiosInstance from "@/utils/axios-instance";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    initialized: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(getCookie("token"));
    const [initialized, setInitialized] = useState<boolean>(false);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        removeCookie("token");
        removeCookie("user");

        logoutApi().catch(() => { });
    }, []);

    const login = useCallback((userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        setCookie("token", authToken);
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = getCookie("token");
            if (!storedToken) {
                setInitialized(true);
                return;
            }

            try {
                const { data } = await getMe();
                setUser(data);
                setToken(storedToken);
            } catch {
                logout();
            } finally {
                setInitialized(true);
            }
        };

        initAuth();
    }, [logout]);

    useEffect(() => {
        const interceptorId = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(interceptorId);
        };
    }, [logout]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                initialized,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};