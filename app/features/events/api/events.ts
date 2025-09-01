
import { PUBLIC_API, PRIVATE_API } from "@/services/api/";
import { logger } from "@/lib/logger";

export type Event = {
    id: string,
    imageUrl: string,
    startAt: string,
    endAt: string,
    code: string,
    time: string,
    title: string,
    location: string,
    host: string,
    description: string,
    past: boolean,
    isRsvpd?: boolean | undefined
}


export async function listEvents() {
    const { data } = await PUBLIC_API.get<Event[]>("/events");
    return data;
}

export async function getEvent(id: string | number) {
    const { data } = await PUBLIC_API.get<Event>(`/events/${id}`);
    return data;
}
export async function deleteEvent(id: string | number) {
    const { data } = await PRIVATE_API.delete<Event>(`/events/${id}`);
    return data;
}
export async function updateEvent(id: string | number, form) {
    const { data } = await PRIVATE_API.patch<Event>(`/events/${id}`, form);
    return data;
}

export async function createEvent(form) {
    const { data } = await PRIVATE_API.post<Event>(`/events`, form);
    return data;
}
import { isAxiosError } from "axios";


export async function checkIn(eventId: string | number, form: { code: string }) {
    try {

        const { data } = await PRIVATE_API.post<Event>(`/events/${eventId}/check-in`, form);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to check-in: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to check-in", { error })
        throw new Error("Unknown error occurred during check-in");
    }
}


export async function rsvp(eventId: string | number) {
    await PRIVATE_API.post(`/rsvps/${eventId}}`);
}

export async function cancelRsvp(eventId: string | number) {
    await PRIVATE_API.delete(`/rsvps/cancel/${eventId}`);
}
