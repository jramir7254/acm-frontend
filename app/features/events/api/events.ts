import { PublicApi } from "@/services/api/public";
import { PrivateApi } from "@/services/api/private";
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
    const { data } = await PublicApi.get<Event[]>("/events");
    return data;
}

export async function getEvent(id: string | number) {
    const { data } = await PublicApi.get<Event>(`/events/${id}`);
    return data;
}
export async function deleteEvent(id: string | number) {
    const { data } = await PrivateApi.delete<Event>(`/events/${id}`);
    return data;
}
export async function updateEvent(id: string | number, form) {
    const { data } = await PrivateApi.patch<Event>(`/events/${id}`, form);
    return data;
}

export async function createEvent(form) {
    const { data } = await PrivateApi.post<Event>(`/events`, form);
    return data;
}

export async function checkIn(eventId: string, form: { code: string }) {
    const { data } = await PrivateApi.post<Event>(`/events/${eventId}/check-in`, form);
    return data;
}

export async function rsvp(eventId: string | number) {
    await PrivateApi.post(`/rsvps/${eventId}}`);
}

export async function cancelRsvp(eventId: string | number) {
    await PrivateApi.delete(`/rsvps/cancel/${eventId}`);
}
