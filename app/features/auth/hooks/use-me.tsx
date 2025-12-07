import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as AuthAPI from "@/features/dashboard/api/user-api";
import { tokenStore } from "../lib/token-store";
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


