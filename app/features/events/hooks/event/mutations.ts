import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import { logger } from "@/lib/logger";



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




export function useDeleteEvent(id: string | number) {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.delete(
            `/events/${id}`
        ),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.events.all, (prev: Event[]) => {
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

export function useCancelRsvp(eventId: string | number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => backend.delete(
            `/events/${eventId}/rsvp`
        ),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.me.field('rsvps'), (prev: UserRsvps[]) => {
                logger.debug('prev', prev)
                return prev.filter(r => r.eventId !== eventId)
            })
            toast.success("Succesfully canceled RSVP")
        },
        onError: () => { toast.error('Could not cancel rsvp') }

    });
}


export function useHelp() {
    return async (form) => {
        // await UserAPI.sendHelp(form)
        toast.success("Succesfully sent request")

    }
}