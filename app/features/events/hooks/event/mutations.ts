import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import { logger } from "@/lib/logger";
import type { EventFormValues } from "../../types/schemas";
import type { Event } from "../../types/event";



export function useCheckIn() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ eventId, form }: { eventId: string | number; form: { code: string } }) => backend.post(
            `/events/${eventId}/check-in`, form
        ),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: queryKeys.me.field('points') });
            qc.invalidateQueries({ queryKey: queryKeys.me.field('attendance') });
            qc.invalidateQueries({ queryKey: queryKeys.me.field('rsvps') });
        },
    });
}


export function useEventFeedback() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ eventId, form }: { eventId: string | number; form: any }) => backend.post(
            `/events/${eventId}/feedback`, form
        ),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: queryKeys.me.field('points') });
            qc.invalidateQueries({ queryKey: queryKeys.me.field('attendance') });
            qc.invalidateQueries({ queryKey: queryKeys.me.field('rsvps') });
            toast.success("Succesfully submitted feedback")
        },
    });
}


export function useCreateOrUpdateEvent(eventId?: number) {
    const queryClient = useQueryClient();
    const mode: 'create' | 'update' = eventId ? 'update' : 'create'

    return useMutation({
        mutationFn: (form: EventFormValues) => {
            return mode === 'create' ? backend.post('/events', form) : backend.patch(`/events/${eventId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
            toast.success(`Event ${mode}d`)
        },
        onError: () => { toast.error(`Error ${mode}ing event`) }

    });
}


export function useDeleteEvent(id: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.delete(
            `/events/${id}`
        ),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.events.list(), (prev: Event[]) => {
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
            queryClient.invalidateQueries({ queryKey: queryKeys.events.all }); // refresh lists/details

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
            queryClient.setQueryData(queryKeys.events.list(), (prev: Event[]) => {
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
            queryClient.setQueryData(queryKeys.me.field('rsvps'), (prev: UserRsvps[]) => {
                logger.debug('prev', prev)
                return [...prev, { eventId, checkedIn: 0, feedback: 0 }]
            })
        },
        onError: (error) => logger.error(error)
    });
}



export function useActionButton({ id, type, externalLink }: Partial<Event>) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            if (type === 'workshop') {
                return backend.post(
                    `/events/${id}/rsvp`
                );
            } else {
                window.open(externalLink, "_blank", "noreferrer");
                return Promise.resolve(null);
            }
        },
        onSuccess: () => {
            if (type === 'workshop') {

                queryClient.setQueryData(queryKeys.me.field('rsvps'), (prev: { eventId: number }[]) => {
                    logger.debug('prev', prev)
                    return [...prev, { eventId: id }]
                })

                queryClient.invalidateQueries({ queryKey: queryKeys.me.field('events') })


                toast.success("RSVP Confirmed");
            }
        },
        onError: () => toast.error("RSVP Confirmed")
    });
}


export function useCancelRsvp(eventId: string | number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.delete(
            `/events/${eventId}/rsvp`
        ),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.me.field('rsvps'), (prev: { eventId: number }[]) => {
                logger.debug('prev', prev)
                return prev?.filter(r => r.eventId !== eventId)
            })
            queryClient.invalidateQueries({ queryKey: queryKeys.me.field('events') })

            toast.success("Succesfully canceled RSVP")
        },
        onError: (error) => { toast.error('Could not cancel rsvp'), logger.error(error) }

    });
}


export function useHelp() {
    return async (form) => {
        // await UserAPI.sendHelp(form)
        toast.success("Succesfully sent request")

    }
}