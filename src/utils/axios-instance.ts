import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import {getCookie, removeCookie} from "@/hooks/use-cookie.ts";

const baseUrl = import.meta.env.VITE_API_BACKEND_URL;

if (!baseUrl) {
    throw new Error("VITE_API_BACKEND_URL is not defined");
}

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getCookie("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url;

        if (status === 401 && !url?.includes("/auth/login")) {
            removeCookie("token");
            removeCookie("user");
            window.location.href = "/auth/sign-in";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;