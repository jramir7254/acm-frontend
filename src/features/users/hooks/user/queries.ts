import { backend } from "@/lib/backend-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";





export function useUser(reqUserId: string) {
    return useQuery({
        queryKey: queryKeys.users.detail.base(reqUserId),
        queryFn: () => backend.get(`/users/${reqUserId}`, { params: { view: 'full' } }),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}

