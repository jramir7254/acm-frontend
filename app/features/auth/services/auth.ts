import { API } from "@/lib/client";

export type LoginInput = { epccId: string; password: string };
export type RegisterInput = { epccId: string; email: string; password: string };
export type LoginResponse = { accessToken: string; expiresIn: number };
export type Me = { id: string; epccId: string; username?: string; email?: string; isAdmin: boolean };
export type Rsvp = { eventId: string; rsvpDate?: string };

export async function login(body: LoginInput) {
    const { data } = await API.post<LoginResponse>("/auth/login", body);
    return data; // { accessToken, expiresIn }
}

export async function register(body: RegisterInput) {
    const { data } = await API.post<LoginResponse>("/auth/register", body);
    return data;
}

export async function userRsvps(epccId: string) {
    const { data } = await API.get<Rsvp[]>(`/rsvps/${epccId}`);
    return data; // { accessToken, expiresIn }

}

export async function me() {
    const { data } = await API.get<Me>("/auth/me");
    return data;
}

export async function logout() {
    await API.post("/auth/logout");
}
