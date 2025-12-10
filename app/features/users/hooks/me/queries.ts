import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";








export function useMe() {
    return useQuery({
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
    return useQuery({
        queryKey: queryKeys.me.field('attendance'),
        queryFn: () => backend.get('/users/me/partial', { params: { fields: 'attendance' } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useMyEvents() {
    return useQuery({
        queryKey: queryKeys.me.field('attendance'),
        queryFn: () => backend.get('/users/me/partial', { params: { fields: ['events'] } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useMyRsvps() {

    return useQuery({
        queryKey: queryKeys.me.field('rsvps'),
        queryFn: () => backend.get('/users/me/partial', { params: { fields: 'rsvps' } }),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}