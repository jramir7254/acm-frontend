import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventKeys } from "../event-keys";
import type { EventFields, Event } from "../../types/event";





export function useEvent(eventId: number) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: eventKeys.detail.base(eventId),
        queryFn: () => backend.get(
            `/events/${eventId}`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,

        initialData: () => {
            const events = queryClient.getQueryData<Event[]>(
                eventKeys.lists.base()
            );
            return events?.find((e: Event) => e.id === eventId);
        },
    });
}







export function useEventField(eventId: number, field: EventFields = 'base') {

    return useQuery({
        queryKey: eventKeys.detail.field(eventId, field),
        queryFn: () => backend.get(
            `/events/${eventId}`,
            { params: { field } }
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,
    });
}