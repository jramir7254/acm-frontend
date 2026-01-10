
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";



export function useRoles() {
    return useQuery({
        queryKey: queryKeys.auth.roles(),
        queryFn: () => backend.get('/auth/roles'),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
