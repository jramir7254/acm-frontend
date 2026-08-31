import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

import type { Event, EventWithStats, EventFields, EventsStats } from "../types";
import type { RatedEvents } from "../types";

export function useEvents() {
    return useQuery<Event[]>({
        queryKey: queryKeys.events.list(),
        queryFn: () => backend.get<Event[]>('/events'),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}


export function useEventsList(filters?: Record<string, any>) {
    return useQuery<Event[]>({
        queryKey: queryKeys.events.list(filters),
        queryFn: () => backend.get<Event[]>('/events', { params: filters }),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}

export function useEventsAttendance(filters?: Record<string, any>) {
    return useQuery<EventWithStats[]>({
        queryKey: queryKeys.events.attendance(filters),
        queryFn: () => backend.get<EventWithStats[]>('/events/attendance', { params: filters }),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}

export function useAdminEvents(semesterId: string = 'current') {
    return useQuery<{ eventsData: EventWithStats[] } & RatedEvents>({
        queryKey: queryKeys.events.list({ view: 'admin', semesterId }),
        queryFn: () => backend.get<{ eventsData: EventWithStats[] } & RatedEvents>('/events', { params: { view: 'admin', semesterId } }),
        // placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}




export function useStats(filters?: Record<string, any>) {
    return useQuery<EventsStats>({
        queryKey: queryKeys.events.stats(filters),
        queryFn: () => backend.get<EventsStats>('/events/stats', { params: filters }),

        staleTime: 15 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useEvent(eventId: number) {
    const queryClient = useQueryClient();

    return useQuery<Event>({
        queryKey: queryKeys.events.detail.base(eventId),
        queryFn: () => backend.get(
            `/events/${eventId}`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,

        initialData: () => {
            const events = queryClient.getQueryData<Event[]>(
                queryKeys.events.list()
            );
            return events?.find((e: Event) => e.id === eventId);
        },
    });
}


export function useEventField(eventId: number, field: EventFields = 'base') {

    return useQuery({
        queryKey: queryKeys.events.detail.field(eventId, field),
        queryFn: () => backend.get(
            `/events/${eventId}`,
            { params: { field } }
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,
    });
}



export function useEventAttendance(eventId: number) {

    return useQuery({
        queryKey: queryKeys.events.detail.attendance(eventId),
        queryFn: () => backend.get(
            `/events/${eventId}/attendance`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,
    });
}


export function useEventRsvps(eventId: number) {
    return useQuery({
        queryKey: queryKeys.events.detail.rsvps(eventId),
        queryFn: () => backend.get(
            `/events/${eventId}/rsvps`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,
    });
}



export function useEventFeedback(eventId: number) {
    return useQuery({
        queryKey: queryKeys.events.detail.feedback(eventId),
        queryFn: () => backend.get(
            `/events/${eventId}/feedback`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,
    });
}

