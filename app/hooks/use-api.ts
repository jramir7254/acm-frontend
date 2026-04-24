import { backend, client } from "@/lib/backend-api"
import type { AxiosRequestConfig } from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

import axios from "axios";
import { useNavigate } from "react-router";
import { useMemo } from "react";

export const useApi = () => {
    const navigate = useNavigate();

    const backend = useMemo(() => {
        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 15000,
            withCredentials: true,
            // headers: { "Content-Type": "application/json" }
        });

        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 403) {
                    // You can also clear local storage/auth state here
                    console.warn("Access forbidden. Redirecting...");
                    navigate("/", { replace: true });
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, []);

    return backend;
};