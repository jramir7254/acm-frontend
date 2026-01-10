import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import type { BaseUser, UserEvent } from "../../types";
import { useCurrentSemester } from "@/features/app/use-semester";
import { tokenStore } from "@/features/auth/lib/token-store";


export function useMe() {
    return useQuery<BaseUser>({
        queryKey: queryKeys.me.base(),
        queryFn: () => backend.get('/users/me'),
        enabled: !!tokenStore.get(),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}



export function useMyPoints() {
    return useQuery({
        queryKey: queryKeys.me.field('points'),
        queryFn: () => backend.get('/users/me/points'),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useMyAttendance() {
    return useQuery<Array<{ eventId: number, checkedInAt: string, status: 'missing' | 'complete' }>>({
        queryKey: queryKeys.me.field('attendance'),
        queryFn: () => backend.get('/users/me/attendance'),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function _useMyEvents(semesterId?: string | 'current') {


    return useQuery<UserEvent[]>({
        queryKey: queryKeys.me.events(semesterId || 'current'),
        queryFn: () => backend.get('/users/me/events', { params: { semesterId: semesterId || 'current' } }),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 1000,

        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useMyRsvps() {

    return useQuery<Array<{ eventId: number }>>({
        queryKey: queryKeys.me.field('rsvps'),
        queryFn: () => backend.get('/users/me/rsvps'),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


