import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Events from "../api/events";
import type { Event } from "@/types";

export const eventsKeys = {
    all: ["events"] as const,
    list: () => [...eventsKeys.all, "list"] as const,
    detail: (id: string | number) => [...eventsKeys.all, "detail", id] as const,
};

import { userKeys } from "../../auth/hooks/useMe";

export function useEvents() {
    return useQuery({
        queryKey: eventsKeys.all,
        queryFn: Events.listEvents,
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000
    });
}

// Optional: combine RSVP info
// export function useEventsWithRsvp() {
//     const { data: me } = useMe();
//     const { data: rsvps = [] } = useUserRsvps(me?.epccId);
//     const q = useEvents();

//     const events = (q.data ?? []).map(e => ({
//         ...e,
//         isRsvpd: rsvps.some(r => r.eventId === e.id),
//     }));

//     return { ...q, data: events };
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


export function useEditEvent(id: string | number) {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form) => Events.updateEvent(id, form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps() });

        },
    });
}
export function useCreateEvent() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form) => Events.createEvent(form),
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
            qc.invalidateQueries({ queryKey: eventsKeys.all });
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
