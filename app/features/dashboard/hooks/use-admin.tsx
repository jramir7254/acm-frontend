import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import * as AdminAPI from "../api/admin-api";
// import { backend } from "@/services/api/backend";
import { backend } from "@/lib/backend-api";

import { toast } from "sonner";
import type { ProfileFormValues } from "../types/profile-schema";
import { type Role } from "@/components/layout";

export interface User {
    firstName: string,
    lastName: string,
    epccEmail: string,
    epccId: string,
    id: number,
    course: number,
    attendance: Attendance[],
    role: Role,
    rsvps: Rsvp[]
}

export interface Rsvp {
    eventId: number,
    rsvpAt: string
}

export interface Attendance {
    eventId: number,
    checkedInAt: string
    status: string,
}

export const usersKeys = {
    all: ['users'] as const,
    one: (userId: string) => [...usersKeys.all, userId] as const,
    students: () => [...usersKeys.all, 'students'] as const
};


export function useUsers() {
    return useQuery({
        queryKey: usersKeys.all,
        queryFn: AdminAPI.getUsers,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useStudents() {
    return useQuery({
        queryKey: usersKeys.students(),
        queryFn: () => backend.get('/users', { params: { view: 'students' } }),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useUser(reqUserId: string) {
    return useQuery({
        queryKey: usersKeys.one(reqUserId),
        queryFn: () => backend.get<User>(`/users/${reqUserId}`, { params: { view: 'full' } }),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}


export function useAssignRole(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (roleData: { id: number, name: Role }) => backend.put(
            `/admin/users/${epccId}/role`,
            roleData
        ),
        onSuccess: () => {
            toast.success("Role applied")
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: usersKeys.one(epccId) })
        },
        onError: () => {
            toast.error('Could not change role')
        }
    });
}

export function useAddAttendance(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (events: number[]) => backend.put(
            `/admin/users/${epccId}/attendance`,

            events),
        onSuccess: () => {
            toast.success("Added to events")
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: usersKeys.one(epccId) })
        },
        onError: () => {
            toast.error('Could not add to events')
        }
    });
}



export function useStats() {
    return useQuery({
        queryKey: ['events', 'stats'],
        queryFn: AdminAPI.getStats,
        staleTime: 15 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}