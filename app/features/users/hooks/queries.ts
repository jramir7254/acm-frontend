import { useQuery } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
import type { BaseUser, UserEvent } from "../types";
import { useCurrentSemester } from "@/features/app/use-semester";
import { tokenStore } from "@/features/auth/lib/token-store";




export function useBaseUser(epccId: string) {
    return useQuery<BaseUser>({
        queryKey: queryKeys.users.detail.base(epccId),
        queryFn: () => backend.get(`/users/${epccId}`),
        enabled: !!tokenStore.get(),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}



export function useUserPoints(epccId: string) {
    return useQuery({
        queryKey: queryKeys.users.detail.points(epccId),
        queryFn: () => backend.get(`/users/${epccId}/points`),
        enabled: !!tokenStore.get(),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}

export function useUserAttendance(epccId: string) {
    return useQuery<Array<{ eventId: number, checkedInAt: string, status: 'missing' | 'complete' }>>({
        queryKey: queryKeys.users.detail.attendance(epccId),
        queryFn: () => backend.get(`/users/${epccId}/attendance`),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function _useMyEvents(semesterId?: string | 'current') {


    return useQuery<UserEvent[]>({
        queryKey: queryKeys.me.events(semesterId || 'current'),
        queryFn: () => backend.get('/users/me/events', { params: { semesterId: semesterId || 'current' } }),
        enabled: !!tokenStore.get(),
        staleTime: 60 * 1000,

        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useUserRsvps(epccId: string) {

    return useQuery<Array<{ eventId: number, title: string, startAt: string, endAt: string }>>({
        queryKey: queryKeys.users.detail.rsvps(epccId),
        queryFn: () => backend.get(`/users/${epccId}/rsvps`),
        enabled: !!tokenStore.get(),

        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useUserCourses(epccId: string) {

    return useQuery<Array<{ eventId: number }>>({
        queryKey: queryKeys.users.detail.courses(epccId),
        queryFn: () => backend.get(`/users/${epccId}/courses`),
        enabled: !!tokenStore.get(),
        staleTime: 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
    });
}


export function useUserFeedbackById(epccId: string, surveyId: number | null) {
    return useQuery({
        queryKey: queryKeys.users.detail.feedback(epccId, surveyId),
        queryFn: () => backend.get(
            `/users/${epccId}/feedback/${surveyId}`,
        ),
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
        // enabled: !!eventId,
    });
}


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
            `/users/stats`, { params: { view: 'stats' } },
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