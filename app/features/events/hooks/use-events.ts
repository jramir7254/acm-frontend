import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { backend } from "@/services/api/backend";
import { backend } from "@/lib/backend-api";


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








export function useDeleteEvent(id: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.delete(
            `/events/${id}`
        ),
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
        mutationFn: ({ id, form }: { id: string | number; form: any }) => backend.patch(
            `/events/${id}`,
            form
        ),
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
        mutationFn: (form: any) => backend.post<Event>(
            `/events`,
            form
        ),
        onSuccess: (data: Event) => {
            queryClient.setQueryData(eventKeys.all, (prev: Event[]) => {
                logger.debug('prev', prev)
                return [...prev, { ...data }]
            })
            toast.success("Event created succesfully")
        },
        onError: () => { toast.error('Could not create event') }
    });
}

export function useRsvp(eventId: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.post(
            `/events/${eventId}/rsvp`
        ),
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
        mutationFn: () => backend.delete(
            `/events/${eventId}/rsvp`
        ),
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
