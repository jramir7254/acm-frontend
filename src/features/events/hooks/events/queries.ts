import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";

import type { Event, EventWithStats } from "../../types/event";
import type { RatedEvents } from "../../type";

export function useEvents() {
    return useQuery<Event[]>({
        queryKey: queryKeys.events.list(),
        queryFn: () => backend.get<Event[]>('/events'),
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




export function useStats() {
    return useQuery<RatedEvents>({
        queryKey: queryKeys.events.list({ view: 'stats' }),
        queryFn: () => backend.get<RatedEvents>('/events', { params: { view: 'stats' } }),

        staleTime: 15 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}