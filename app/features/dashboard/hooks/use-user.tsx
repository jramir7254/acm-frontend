import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import * as UserAPI from "../api/user-api";
import * as EventAPI from '@/features/events/api/events'
import { toast } from "sonner";
import type { ProfileFormValues } from "../types/profile-schema";

export const userKeys = {
    all: ['user'] as const,
    me: ["user", "me"] as const,
    rsvps: ["user", "rsvps"] as const,
    points: ["user", "points"] as const,
    attendance: ["user", "attendance"] as const,
};


export function useUpdateMe() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: ProfileFormValues) => UserAPI.updateMe(form),
        onSuccess: () => {
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: userKeys.all })
        }
    });
}



export const prefetchUserQueries = async (queryClient: QueryClient) => {

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: userKeys.me,
            queryFn: () => UserAPI.me(),
        }),
        queryClient.prefetchQuery({
            queryKey: userKeys.rsvps,
            queryFn: () => UserAPI.userRsvps(),
        }),
        queryClient.prefetchQuery({
            queryKey: userKeys.attendance,
            queryFn: () => UserAPI.getUserData(['attendance']),
        }),
        queryClient.prefetchQuery({
            queryKey: userKeys.points,
            queryFn: () => UserAPI.getUserData(['points']),
        }),
    ]);
}


export function useUser() {
    return useQuery({
        queryKey: userKeys.me,
        queryFn: UserAPI.me,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useCheckIn() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ eventId, form }: { eventId: string | number; form: { code: string } }) => EventAPI.checkIn(eventId, form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: userKeys.points });
            qc.invalidateQueries({ queryKey: userKeys.attendance });
            qc.invalidateQueries({ queryKey: userKeys.rsvps });
        },
    });
}


export function useEventFeedback() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ eventId, form }: { eventId: string | number; form: any }) => EventAPI.feedback(eventId, form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: userKeys.points });
            qc.invalidateQueries({ queryKey: userKeys.attendance });
            qc.invalidateQueries({ queryKey: userKeys.rsvps });
            toast.success("Succesfully submitted feedback")
        },
    });
}


export function useHelp() {
    return async (form) => {
        await UserAPI.sendHelp(form)
        toast.success("Succesfully sent request")

    }
}




export function useAddPoints() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => UserAPI.addPoints(),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: userKeys.points });
        },
    });
}





export function useUserPoints() {
    return useQuery({
        queryKey: userKeys.points,
        queryFn: () => UserAPI.getUserData(['points']),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useUserAttendance() {
    return useQuery({
        queryKey: userKeys.attendance,
        queryFn: () => UserAPI.getUserData(['attendance']),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useUserRsvps() {

    return useQuery({
        queryKey: userKeys.rsvps,
        queryFn: () => UserAPI.getUserData(['rsvps']),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}