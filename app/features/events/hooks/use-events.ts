import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Events from "../api/events";
import { toast } from "sonner";
import { backend } from "@/services/api/backend";

import { eventKeys } from "./event-keys";
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
        queryKey: eventKeys.lists.base(),
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

export function useEventsReport() {
    return useQuery({
        queryKey: eventKeys.lists.report(),
        queryFn: () => backend.get<Event[]>({ root: 'admin', route: ['events', 'report'] }),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}






export function useDeleteEvent(id: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => Events.deleteEvent(id),
        onSuccess: () => {
            queryClient.setQueryData(eventKeys.all, (prev: Event[]) => {
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
            queryClient.invalidateQueries({ queryKey: eventKeys.all }); // refresh lists/details
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
            queryClient.setQueryData(eventKeys.all, (prev: Event[]) => {
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
