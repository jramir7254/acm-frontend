import { PrivateApi } from "@/services/api";
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
    const { data } = await PrivateApi.get<Partial<User>>(
        "/users/me/partial",
        {
            params: fields ? { fields: fields.join(",") } : {}
        }
    );
    return data;
}


export async function addPoints() {
    const { data } = await PrivateApi.post<Rsvp[]>(`/users/points`);
    return data.newPoints
}




export async function userRsvps() {
    const { data } = await PrivateApi.get<UserRsvps[]>(`/users/me/rsvps`);
    return data
}

export async function me() {
    const { data } = await PrivateApi.get<User>("/users/me");
    return data;
}
export async function updateMe(payload) {
    logger.debug(payload)
    const { data } = await PrivateApi.patch<User>("/users/me", payload);
    return data;
}

