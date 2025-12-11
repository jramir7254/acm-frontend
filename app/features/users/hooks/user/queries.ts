import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventKeys } from "../event-keys";
import type { EventFields, Event } from "../../types/event";





export function useUser(reqUserId: string) {
    return useQuery({
        queryKey: usersKeys.one(reqUserId),
        queryFn: () => backend.get<User>(`/users/${reqUserId}`, { params: { view: 'full' } }),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}

