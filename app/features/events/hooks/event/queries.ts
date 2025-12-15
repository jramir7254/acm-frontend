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