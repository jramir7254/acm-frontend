import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as UserAPI from "../api/user-api";
import type { ProfileFormValues } from "@/features/dashboard/types/profile-schema";

import { userKeys } from "@/features/auth/hooks/use-me";

export function useUserPoints(epccId?: string) {
    return useQuery({
        queryKey: userKeys.points(epccId),
        queryFn: () => UserAPI.getUser(['points']),
        enabled: !!epccId, // waits until we know the user
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useUserAttendance(epccId?: string) {
    return useQuery({
        queryKey: userKeys.attendance(epccId),
        queryFn: () => UserAPI.getUser(['attendance']),
        enabled: !!epccId, // waits until we know the user
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}