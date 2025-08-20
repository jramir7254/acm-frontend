import axios, { type AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const PublicApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
});
