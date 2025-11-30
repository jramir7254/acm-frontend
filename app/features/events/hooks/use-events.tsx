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
        queryFn: () => backend.get<Event[]>({ root: 'events' }),
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


export function useEvent(eventId: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: eventsKeys.read(eventId),
        queryFn: () => backend.get({ root: 'events', route: [eventId] }), // fetch if missing
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
            queryClient.setQueryData(eventsKeys.all, (prev: Event[]) => {
                logger.debug('prev', prev)
                return prev.filter(e => e.id !== id)
            })
            toast.success("Event deleted succesfully")

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
        onError: () => { toast.error('Could not delete event') }

    });
}


export function useCreateEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => backend.post<Event>({ root: 'events', payload: form }),
        onSuccess: (data: Event) => {
            queryClient.setQueryData(eventsKeys.all, (prev: Event[]) => {
                logger.debug('prev', prev)
                return [...prev, { ...data }]
            })
            toast.success("Event created succesfully")
            // queryClient.invalidateQueries({ queryKey: eventsKeys.all }); // refresh lists/details
            // queryClient.invalidateQueries({ queryKey: userKeys.rsvps });
        },
        onError: () => { toast.error('Could not create event') }
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
            })
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps, refetchType: 'none' });
        },
        onError: (error) => logger.error(error)
    });
}

export function useCancelRsvp(eventId: string | number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => Events.cancelRsvp(eventId),
        onSuccess: () => {
            queryClient.setQueryData(userKeys.rsvps, (prev: UserRsvps[]) => {
                logger.debug('prev', prev)
                return prev.filter(r => r.eventId !== eventId)
            })
            queryClient.invalidateQueries({ queryKey: userKeys.rsvps, refetchType: 'none' });
            toast.success("Succesfully canceled RSVP")
        },
        onError: () => { toast.error('Could not cancel rsvp') }

    });
}
