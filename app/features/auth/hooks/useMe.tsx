import { useQuery } from "@tanstack/react-query";
import * as AuthAPI from "@/features/auth/services/auth";

export const userKeys = {
    me: ["user", "me"] as const,
    rsvps: (epccId?: string) => ["user", "rsvps", epccId ?? ""] as const,
};



export function useMe() {
    return useQuery({
        queryKey: userKeys.me,
        queryFn: AuthAPI.me,
        // These can override the defaults if you'd like longer persistence for `/me`
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useUserRsvps(epccId?: string) {
    return useQuery({
        queryKey: userKeys.rsvps(epccId),
        queryFn: () => AuthAPI.userRsvps(epccId!),
        enabled: !!epccId, // waits until we know the user
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}