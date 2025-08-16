// app/lib/client.ts
import axios, { type AxiosInstance } from "axios";
import {
    beginGlobalRefresh,
    endGlobalRefresh,
    isGlobalRefreshing,
    onRefreshDone,
} from "@/lib/auth-refresh";
import { tokenStore } from "@/features/auth/services/token-store";

const BASE_URL = import.meta.env.VITE_API_URL;

export const API: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true, // send/receive the httpOnly refresh cookie
});

// Attach Authorization on each request
API.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 401 -> cross-tab aware refresh -> retry once
let isRefreshingLocal = false;
let waiters: Array<(t: string | null) => void> = [];

API.interceptors.response.use(
    (r) => r,
    async (error) => {
        const { response, config } = error || {};
        if (!response || response.status !== 401 || (config as any)?.__isRetry) throw error;

        const hadAuthHeader = !!config?.headers?.Authorization;
        const isRefreshCall = config?.url?.includes("/auth/refresh");

        // If request had no auth header, it's either public or pre-auth.
        // Do NOT logout on these; just surface the error.
        if (!hadAuthHeader && !isRefreshCall) {
            return Promise.reject(error);
        }


        // If another request in THIS tab is already refreshing, queue behind it
        if (isRefreshingLocal) {
            return new Promise((resolve) => {
                waiters.push((newToken) => {
                    if (newToken) (config.headers ??= {}).Authorization = `Bearer ${newToken}`;
                    (config as any).__isRetry = true;
                    resolve(API(config));
                });
            });
        }

        // If ANOTHER TAB is refreshing, wait for its completion via BroadcastChannel
        if (isGlobalRefreshing()) {
            return new Promise((resolve) => {
                const unsubscribe = onRefreshDone((newToken) => {
                    unsubscribe?.();
                    if (newToken) (config.headers ??= {}).Authorization = `Bearer ${newToken}`;
                    (config as any).__isRetry = true;
                    resolve(API(config));
                });
            });
        }

        // Be the leader (this tab does the refresh)
        isRefreshingLocal = true;
        beginGlobalRefresh();

        // Helper to apply a new token & retry the original request
        const applyAndRetry = (newToken: string) => {
            const persist = tokenStore.currentPersist?.() ?? "local";
            tokenStore.set(newToken, { persist: persist as "local" | "session" });
            waiters.forEach((cb) => cb(newToken));
            waiters = [];
            (config.headers ??= {}).Authorization = `Bearer ${newToken}`;
            (config as any).__isRetry = true;
            return API(config);
        };

        try {
            // First refresh attempt
            const r1 = await axios.post(
                `${API.defaults.baseURL}/auth/refresh`,
                null,
                { withCredentials: true }
            );
            const newToken = r1.data?.accessToken as string | undefined;
            if (!newToken) throw error;
            endGlobalRefresh(newToken);
            return applyAndRetry(newToken);
        } catch (e: any) {
            // Handle race with concurrent rotation: optional graceful retry
            const code = e?.response?.data?.code;
            const status = e?.response?.status;
            if (status === 409 && code === "stale_refresh") {
                // Another request likely rotated already → give the cookie jar a beat, then retry once
                await new Promise((r) => setTimeout(r, 200));
                try {
                    const r2 = await axios.post(
                        `${API.defaults.baseURL}/auth/refresh`,
                        null,
                        { withCredentials: true }
                    );
                    const newToken2 = r2.data?.accessToken as string | undefined;
                    if (!newToken2) throw e;
                    endGlobalRefresh(newToken2);
                    return applyAndRetry(newToken2);
                } catch (e2) {
                    endGlobalRefresh(null);
                    waiters.forEach((cb) => cb(null));
                    waiters = [];
                    tokenStore.clear();
                    throw e2;
                }
            }

            // Any other failure → end + clear
            endGlobalRefresh(null);
            waiters.forEach((cb) => cb(null));
            waiters = [];
            tokenStore.clear();
            throw e;
        } finally {
            isRefreshingLocal = false;
        }
    }
);
