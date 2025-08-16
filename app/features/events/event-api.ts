// app/lib/client.ts
import axios, { type AxiosInstance } from "axios";
import { tokenStore } from "@/features/auth/services/token-store";

const BASE_URL = import.meta.env.VITE_API_URL;

export const EventApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: false, // send/receive the httpOnly refresh cookie
});

// Attach Authorization on each request
// EventApi.interceptors.request.use((config) => {
//     const token = tokenStore.get();
//     if (token) {
//         config.headers = config.headers ?? {};
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
