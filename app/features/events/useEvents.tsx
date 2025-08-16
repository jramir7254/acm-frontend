import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Events from "./events";
import type { Event } from "@/types";

export const eventsKeys = {
    all: ["events"] as const,
    list: () => [...eventsKeys.all, "list"] as const,
    detail: (id: string | number) => [...eventsKeys.all, "detail", id] as const,
};

import { userKeys } from "../auth/hooks/useMe";

// export function useEvents() {
//     return useQuery({
//         queryKey: eventsKeys.list(),
//         queryFn: Events.listEvents,
//     });
// }

export function useDeleteEvent(id: string | number) {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => Events.deleteEvent(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps() });

        },
    });
}

export function useRsvp(eventId: string | number, userId: string) {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => Events.rsvp(eventId, userId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps(userId) });

        },
    });
}

export function useCancelRsvp(eventId: string | number, userId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => Events.cancelRsvp(eventId, userId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all });
            qc.invalidateQueries({ queryKey: userKeys.rsvps(userId) });
        },
    });
}
