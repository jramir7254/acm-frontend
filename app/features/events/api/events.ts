import { PublicApi } from "@/services/api/public";
import { PrivateApi } from "@/services/api/private";
import type { Event } from "@/types";

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
    console.log({ id, form })
    const { data } = await PrivateApi.patch<Event>(`/events/${id}`, form);
    return data;
}
export async function createEvent(form) {
    console.log({ id, form })
    const { data } = await PrivateApi.post<Event>(`/events`, form);
    return data;
}

export async function rsvp(eventId: string | number, userId: string) {
    await PrivateApi.post(`/rsvps/${eventId}/${userId}`);
}

export async function cancelRsvp(eventId: string | number, userId: string) {
    await PrivateApi.delete(`/rsvps/cancel/${eventId}/${userId}`);
}
