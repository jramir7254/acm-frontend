import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { getCourses } from "@/services/api";

export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: getCourses,
        staleTime: 24 * 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
