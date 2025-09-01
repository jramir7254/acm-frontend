import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Events from "../api/events";
import { toast } from "sonner";
import { type Event } from "../api/events";

export const eventsKeys = {
    all: ["events"] as const,
    list: () => [...eventsKeys.all, "list"] as const,
    read: (id: string | number) => [...eventsKeys.all, "read", id] as const,
};

import { userKeys } from "@/features/dashboard/hooks/use-user";

export function useEvents() {
    return useQuery({
        queryKey: eventsKeys.all,
        queryFn: Events.listEvents,
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}

export function useEventsData() {
    return useEvents().data ?? [];
}


export function useEvent(eventId: number) {
    const qc = useQueryClient();

    return useQuery({
        queryKey: eventsKeys.read(eventId),
        queryFn: () => Events.getEvent(eventId), // fetch if missing
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,

        // 👇 If we already have the list, use that instead of refetching
        initialData: () => {
            const events = qc.getQueryData<Awaited<ReturnType<typeof Events.listEvents>>>(
                eventsKeys.all
            );
            return events?.find((e: Event) => e.id === eventId);
        },
    });
}



export function useDeleteEvent(id: string | number) {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => Events.deleteEvent(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}


export function useEditEvent() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, form }: { id: string | number; form: any }) => Events.updateEvent(id, form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}
export function useCreateEvent() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => Events.createEvent(form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            qc.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}

export function useRsvp() {

    const qc = useQueryClient();
    return useMutation({
        mutationFn: (eventId: string | number) => Events.rsvp(eventId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all });
            qc.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}

export function useCancelRsvp() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (eventId: string | number) => Events.cancelRsvp(eventId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: eventsKeys.all });
            qc.invalidateQueries({ queryKey: userKeys.rsvps });
            toast.success("Succesfully canceled RSVP")
        },
    });
}
