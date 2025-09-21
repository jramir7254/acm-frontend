import { PrivateApi } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

export type Rsvp = { eventId: string; rsvpDate?: string };

export type User = {
    epccId: string,
    fullName: string,
    firstName: string,
    lastName: string,
    epccEmail: string,
    points: number,
    course: string,
    courseId: string | number,
    eventsAttended: EventsAttended,
    accountComplete: boolean,
    permissions: string[],
    role: string,
    rsvps: UserRsvps[]
}

export type EventsAttended = { complete: number, pending: number }

export type UserRsvps = {
    eventId: string,
    checkedIn: boolean
}




export async function getUserData(fields?: string[]): Promise<Partial<User>> {
    try {

        logger.debug('get user data payload:', { fields })
        const { data } = await PrivateApi.get<Partial<User>>(
            "/users/me/partial",
            {
                params: fields ? { fields: fields.join(",") } : {}
            }
        ); logger.success('get user data:', data)
        return data; // { accessToken, expiresIn }

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to get user data: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to get user data", { error })
        throw new Error("Unknown error occurred during get user data");
    }

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

