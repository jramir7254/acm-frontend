import { EventApi } from "./event-api";
import type { Event } from "@/types";

export async function listEvents() {
    const { data } = await EventApi.get<Event[]>("/events");
    return data;
}

export async function getEvent(id: string | number) {
    const { data } = await EventApi.get<Event>(`/events/${id}`);
    return data;
}
export async function deleteEvent(id: string | number) {
    const { data } = await EventApi.delete<Event>(`/events/${id}`);
    return data;
}

export async function rsvp(eventId: string | number, userId: string) {
    await EventApi.post(`/rsvps/${eventId}/${userId}`);
}

export async function cancelRsvp(eventId: string | number, userId: string) {
    await EventApi.delete(`/rsvps/cancel/${eventId}/${userId}`);
}
