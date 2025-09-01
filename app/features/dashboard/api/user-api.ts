import { PRIVATE_API } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

export type Rsvp = { eventId: string; rsvpDate?: string };

export type User = {
    epccId: string,
    fullName: string,
    firstName: string,
    lastName: string,
    email: string,
    points: number,
    course: string,
    courseId: string | number,
    eventsAttended: number,
    accountComplete: boolean,
    permissions: string[],
    role: string,
}

export type UserRsvps = {
    eventId: string,
    checkedIn: boolean
}




export async function getUserData(fields?: string[]) {
    const { data } = await PRIVATE_API.get<Partial<User>>(
        "/auth/users/me",
        {
            params: fields ? { fields: fields.join(",") } : {}
        }
    );
    return data;
}


export async function addPoints() {
    const { data } = await PRIVATE_API.post<Rsvp[]>(`/auth/users/points`);
    return data.newPoints
}




export async function userRsvps() {
    const { data } = await PRIVATE_API.get<UserRsvps[]>(`/rsvps`);
    return data
}
export async function verifyEmail(payload: { token: string; code: string }) {
    const { data } = await PRIVATE_API.post("/auth/verify-email", payload);
    // Backend returns { message, accessToken, expiresIn }, refresh cookie set httpOnly
    return data as { message: string; accessToken: string; expiresIn: number };
}

export async function me() {
    const { data } = await PRIVATE_API.get<User>("/auth/me");
    return data;
}
export async function updateMe(payload) {
    const { data } = await PRIVATE_API.patch<User>("/auth/me", payload);
    return data;
}

