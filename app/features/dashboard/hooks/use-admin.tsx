import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import * as AdminAPI from "../api/admin-api";
import * as EventAPI from '@/features/events/api/events'
import { toast } from "sonner";
import type { ProfileFormValues } from "../types/profile-schema";

export const usersKeys = {
    all: ['users'] as const,

};


export function useUsers() {
    return useQuery({
        queryKey: usersKeys.all,
        queryFn: AdminAPI.getUsers,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
export function useStats() {
    return useQuery({
        queryKey: ['events', 'stats'],
        queryFn: AdminAPI.getStats,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}