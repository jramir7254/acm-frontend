import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import type { EventFields, Event } from "../../types/event";





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