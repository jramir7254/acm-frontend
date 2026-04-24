import { backend } from "@/lib/backend-api";
import { useApi } from "@/hooks/use-api"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";



export function useUsers() {
    // const backend = useApi()
    return useQuery({
        queryKey: queryKeys.users.list(),
        queryFn: () => backend.get(
            `/users`,
        ),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}

export function useUsersStats() {
    return useQuery({
        queryKey: queryKeys.users.stats(),
        queryFn: () => backend.get(
            `/users`, { params: { view: 'stats' } },
        ),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useStudents() {
    return useQuery({
        queryKey: queryKeys.users.students(),
        queryFn: () => backend.get('/users', { params: { view: 'students' } }),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
