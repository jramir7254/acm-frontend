
import { PUBLIC_API, PrivateApi } from "@/services/api/";
import { logger } from "@/lib/logger";
import { apiCall } from "@/services/api/backend";

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
    logger.debug('call made here to ev')

    const { data } = await PrivateApi.get<Event>(`/events/${id}`);
    logger.debug('call made here to ev', { data })
    return data;
}
export async function deleteEvent(id: string | number) {
    const { data } = await PrivateApi.delete<Event>(`/events/${id}`);
    return data;
}
export async function updateEvent(id: string | number, form) {
    logger.debug("update paylod", form)
    const { data } = await PrivateApi.patch<Event>(`/events/${id}`, form);
    return data;
}

export async function createEvent(form: Partial<Event>) {
    logger.debug('create event payload:', form)

    return apiCall('Create Event', () => PrivateApi.post<Event>(`/events`, form))
}
import { isAxiosError } from "axios";


export async function feedback(id: string | number, form: Partial<Event>) {
    logger.debug('feedback event payload:', form)

    return await apiCall('feedback Event', () => PrivateApi.post<Event>(`/events/${id}/feedback`, form))
}





export async function checkIn(eventId: string | number, form: { code: string }) {
    try {

        const { data } = await PrivateApi.post<Event>(`/events/${eventId}/check-in`, form);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.response?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to check-in: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to check-in", { error })
        throw new Error("Unknown error occurred during check-in");
    }
}


export async function rsvp(eventId: string | number) {
    await PrivateApi.post(`/events/${eventId}}/rsvp`);
}

export async function cancelRsvp(eventId: string | number) {
    await PrivateApi.delete(`/events/${eventId}/rsvp`);
}
