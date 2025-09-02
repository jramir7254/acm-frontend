import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as AuthAPI from "@/features/dashboard/api/user-api";
import { tokenStore } from "../services/token-store";
import type { ProfileFormValues } from "@/features/dashboard/types/profile-schema";

export const userKeys = {
    all: ['user'] as const,
    me: ["user", "me"] as const,
    rsvps: (epccId?: string) => ["user", "rsvps", epccId ?? ""] as const,
    points: (epccId?: string) => ["user", "points", epccId ?? ""] as const,
    attendance: (epccId?: string) => ["user", "attendance", epccId ?? ""] as const,

};



export function useMe() {
    return useQuery({
        queryKey: userKeys.me,
        queryFn: AuthAPI.me,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}




export function useUpdateMe() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: ProfileFormValues) => AuthAPI.updateMe(form),
        onSuccess: () => {
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}


export function useUserRsvps() {

    return useQuery({
        queryKey: userKeys.rsvps(),
        queryFn: () => AuthAPI.userRsvps(),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}