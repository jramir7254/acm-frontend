import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Events from "../api/events";
import { toast } from "sonner";
import { backend } from "@/services/api/backend";

export const eventsKeys = {
    all: ["events"] as const,
    list: () => [...eventsKeys.all, "list"] as const,
    read: (id: string | number) => [...eventsKeys.all, "read", id] as const,
};

export type Event = {
    id: string,
    imageUrl: string,
    startAt: string,
    endAt: string,
    code: string,
    time: string,
    title: string,
    location: string,
    host: string,
    description: string,
    past: boolean,
    isRsvpd?: boolean | undefined
}


import { userKeys } from "@/features/dashboard/hooks/use-user";
import type { UserRsvps } from "@/features/dashboard/api/user-api";
import { logger } from "@/lib/logger";



export function useEvents() {
    return useQuery({
        queryKey: eventsKeys.all,
        queryFn: () => backend.get({ root: 'events' }),
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


export function useEvent(eventId: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: eventsKeys.read(eventId),
        queryFn: () => backend.get({ root: 'events' }), // fetch if missing
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        enabled: !!eventId,

        // 👇 If we already have the list, use that instead of refetching
        // initialData: () => {
        //     const events = queryClient.getQueryData<Awaited<ReturnType<typeof Events.listEvents>>>(
        //         eventsKeys.all
        //     );
        //     return events?.find((e: Event) => e.id === eventId);
        // },
    });
}



export function useDeleteEvent(id: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => Events.deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            queryClient.invalidateQueries({ queryKey: userKeys.all });

        },
    });
}


export function useEditEvent() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, form }: { id: string | number; form: any }) => Events.updateEvent(id, form),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}
export function useCreateEvent() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => backend.post({ root: 'events', payload: form }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps });

        },
    });
}

export function useRsvp(eventId: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => Events.rsvp(eventId),
        onSuccess: () => {
            queryClient.setQueryData(userKeys.rsvps, (prev: UserRsvps[]) => {
                logger.debug('prev', prev)
                return [...prev, { eventId, checkedIn: 0, feedback: 0 }]
            }
            )
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps, refetchType: 'none' });
        },
        onError: (error) => logger.error(error)
    });
}

export function useCancelRsvp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (eventId: string | number) => Events.cancelRsvp(eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps });
            queryClient.invalidateQueries({ queryKey: eventsKeys.all });
            toast.success("Succesfully canceled RSVP")
        },
    });
}
