import type { EventFields } from "@/features/events/types/event";

export type UserFields = 'rsvps' | 'attendance' | 'points' | 'events'


export const queryKeys = {
    all: ["all"] as const,

    app: {
        all: ['app'] as const,
        semesters: () => [...queryKeys.app.all, "semesters"] as const,
        currentSemester: () => [...queryKeys.app.all, "semesters", "current"] as const,
    },

    auth: {
        all: ['auth'] as const,
        roles: () => [...queryKeys.auth.all, "roles"] as const,
        permissions: () => [...queryKeys.auth.all, "perms"] as const,

    },
    me: {
        all: ['me'] as const,
        base: () => [...queryKeys.me.all, "base"] as const,
        field: (field: UserFields | string) => [...queryKeys.me.all, "field", field] as const,
        events: (semesterId: string | 'current') => [...queryKeys.me.all, "events", semesterId] as const,
    },

    users: {
        all: ["users"] as const,
        list: () =>
            [...queryKeys.users.all, "list"] as const,
        stats: () =>
            [...queryKeys.users.all, "stats"] as const,
        students: () =>
            [...queryKeys.users.all, "students"] as const,
        detail: {
            base: (epccId: string) =>
                [...queryKeys.users.all, "detail", epccId] as const,

            field: (epccId: string, field: EventFields) =>
                [...queryKeys.users.detail.base(epccId), field] as const,
        },
    },

    events: {
        all: ['events'] as const,
        lists: () => [...queryKeys.events.all, 'list'] as const,
        list: (params?: {
            filters?: Record<string, unknown>
            view?: 'public' | 'admin' | 'stats'
            semesterId?: string | 'current'
        }) =>
            [...queryKeys.events.lists(), params ?? {}] as const,

        detail: {
            base: (id: number) =>
                [...queryKeys.events.all, "detail", id] as const,

            field: (id: number, field: EventFields) =>
                [...queryKeys.events.detail.base(id), field] as const,

            rsvps: (id: number) =>
                [...queryKeys.events.detail.base(id), 'rsvps'] as const,

            attendance: (id: number) =>
                [...queryKeys.events.detail.base(id), 'attendance'] as const,

            feedback: (id: number) =>
                [...queryKeys.events.detail.base(id), 'feedback'] as const,
        },
    },
};
