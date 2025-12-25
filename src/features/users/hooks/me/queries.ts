import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import { useEvents } from "@/features/events/hooks/events/queries";
import type { Event } from "@/features/events/types/event";
import { useMemo } from "react";
import type { BaseUser } from "../../types";



export function useMe() {
    return useQuery<BaseUser>({
        queryKey: queryKeys.me.base(),
        queryFn: () => backend.get('/auth/me'),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}



export function useMyPoints() {
    return useQuery({
        queryKey: queryKeys.me.field('points'),
        queryFn: () => backend.get('/users/me/partial', { params: { fields: 'points' } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useMyAttendance() {
    return useQuery<Array<{ eventId: number, checkedInAt: string, status: 'missing' | 'complete' }>>({
        queryKey: queryKeys.me.field('attendance'),
        queryFn: () => backend.get('/me', { params: { field: 'attendance' } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useMyEvents() {
    const { data: attendance, isLoading: attendanceLoading } = useMyAttendance()
    const { data: rsvps, isLoading: rsvpsLoading } = useMyRsvps()
    const { data: events, isLoading: eventsLoading } = useEvents()


    const mergeUnique = (...arrays: [typeof rsvps, typeof attendance]) => {
        const map = new Map();
        arrays.flat().forEach(obj => map.set(obj?.eventId, obj));
        return [...map.values()];
    };

    const data = useMemo(() => {
        return mergeUnique(rsvps, attendance).map(d => {
            const event = events?.find(e => e.id === d?.eventId)
            return { ...d, event }
        })

    }, [attendance, rsvps, events])

    const isLoading = attendanceLoading || rsvpsLoading || eventsLoading

    return { data, isLoading }
}


export function useMyRsvps() {

    return useQuery<Array<{ eventId: number }>>({
        queryKey: queryKeys.me.field('rsvps'),
        queryFn: () => backend.get('/me', { params: { field: 'rsvps' } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


