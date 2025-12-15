import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";

import { type Event } from "../../types/event";

export function useEvents() {
    return useQuery<Event[]>({
        queryKey: queryKeys.events.list(),
        queryFn: () => backend.get<Event[]>('/events'),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}

export function useEventsData() {
    return useEvents().data ?? [];
}

export function useNumEvents() {
    return useEvents().data?.length ?? 0;
}


export function useStats() {
    return useQuery({
        queryKey: queryKeys.events.list({}, 'stats'),
        queryFn: () => backend.get<Event[]>('/events/list/stats'),

        staleTime: 15 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}