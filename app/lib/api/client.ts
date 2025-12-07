import axios, { isAxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import { logger, setCorrelationId, clearCorrelationId } from "@/lib/logger";

const apiLogger = logger.create('API')

import { tokenStore } from "@/features/auth/lib/token-store";
const BASE_URL = import.meta.env.VITE_API_URL;

let isRefreshingLocal = false;
let waiters: Array<(t: string | null) => void> = [];

export const clien: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
});

clien.interceptors.request.use((config) => {

    const token = tokenStore.get();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    apiLogger.debug(`<Request>`, {
        method: config.method,
        url: config.url,
        params: config.params,
        body: config.data,
        headers: config.headers
    })
    return config;
});



clien.interceptors.response.use(
    (response) => {
        apiLogger.debug(`<Response>`, {
            data: response.data,
            status: response.status,
        })

        return response.data
    },

    (error) => {
        apiLogger.error('<Raw Error>:', error)
        const err = error.response?.data || {
            success: false,
            message: "Unknown error",
            code: "UNKNOWN",
        }
        apiLogger.error('<Normalized Error>:', err)


        const { response, config } = error || {};
        if (!response || response.status !== 401 || (config as any)?.__isRetry) return Promise.reject(err);

        const hadAuthHeader = !!config?.headers?.Authorization;
        const isRefreshCall = config?.url?.includes("/auth/refresh");

        // If request had no auth header, it's either public or pre-auth.
        // Do NOT logout on these; just surface the error.
        if (!hadAuthHeader && !isRefreshCall) {
            logger.info('public or preauth res')
            return Promise.reject(err);
        }


        // If another request in THIS tab is already refreshing, queue behind it
        if (isRefreshingLocal) {
            return new Promise((resolve) => {
                waiters.push((newToken) => {
                    if (newToken) (config.headers ??= {}).Authorization = `Bearer ${newToken}`;
                    (config as any).__isRetry = true;
                    resolve(clien(config));
                });
            });
        }
    }
);


export const backend = {
    get: async <T = any>(url: string, config?: AxiosRequestConfig) =>
        clien.get<T>(url, config).then(res => res.data as T),
    post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        clien.post<T>(url, data, config).then(res => res.data as T),
    put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        clien.put<T>(url, data, config).then(res => res.data as T),
    delete: async <T = any>(url: string, config?: AxiosRequestConfig) =>
        clien.delete<T>(url, config).then(res => res.data as T),
};