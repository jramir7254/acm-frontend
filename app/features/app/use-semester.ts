import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import type { Semester } from "./types";



export function useSemesters() {
    return useQuery<Semester[]>({
        queryKey: queryKeys.app.semesters(),
        queryFn: () => backend.get('/public/semesters'),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useCurrentSemester() {
    return useQuery<Semester>({
        queryKey: queryKeys.app.currentSemester(),
        queryFn: () => backend.get('/public/semesters/current'),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


