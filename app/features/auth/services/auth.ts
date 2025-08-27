import { API } from "@/lib/client";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

export type LoginInput = { epccId: string; password: string };
export type RegisterInput = { epccId: string; email: string; password: string };
export type LoginResponse = { accessToken: string; expiresIn: number };
export type RegisterResponse = { token: string };
export type Me = { id: string; epccId: string; username?: string; email?: string; isAdmin: boolean };
export type Rsvp = { eventId: string; rsvpDate?: string };
import type { User } from "../types/user";
export async function login(body: LoginInput) {
    try {
        const { data } = await API.post<LoginResponse>("/auth/login", body);
        return data; // { accessToken, expiresIn }

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to log in in user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to log in user", { error })
    }
}

export async function register(body: RegisterInput) {
    try {
        const { data } = await API.post<RegisterResponse>("/auth/register", body);
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to register in user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to register user", { error })
    }

}

export async function userRsvps(epccId: string) {
    const { data } = await API.get<Rsvp[]>(`/rsvps/${epccId}`);
    return data.userRsvps
}
export async function verifyEmail(payload: { token: string; code: string }) {
    const { data } = await API.post("/auth/verify-email", payload);
    // Backend returns { message, accessToken, expiresIn }, refresh cookie set httpOnly
    return data as { message: string; accessToken: string; expiresIn: number };
}

export async function me() {
    const { data } = await API.get<User>("/auth/me");
    return data;
}
export async function updateMe(payload) {
    const { data } = await API.patch<User>("/auth/me", payload);
    return data;
}

export async function logout() {
    await API.post("/auth/logout");
}
