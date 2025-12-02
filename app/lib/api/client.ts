import axios, { isAxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import { logger, setCorrelationId, clearCorrelationId } from "@/lib/logger";

import { tokenStore } from "@/features/auth/services/token-store";
const BASE_URL = import.meta.env.VITE_API_URL;

export const backend: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
});

backend.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function request<TResponse = unknown, TBody = unknown>(
    config: AxiosRequestConfig<TBody>
): Promise<TResponse> {
    const res = await backend.request<TResponse>(config);
    return res.data;
}

backend.get('', {})