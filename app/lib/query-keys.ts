import type { EventFields } from "@/features/events/types/event";

export type UserFields = 'rsvps' | 'attendance' | 'points' | 'events'


export const queryKeys = {
    me: {
        all: ['me'] as const,
        base: () => [...queryKeys.me.all, "base"] as const,
        field: (field: UserFields | string) => [...queryKeys.me.all, "field", field] as const,
    },

    users: {
        all: ["users"] as const,
        list: (filters?: Record<string, any>, view?: string) =>
            [...queryKeys.users.all, "list", filters, view] as const,
        detail: {
            base: (epccId: string) =>
                [...queryKeys.users.all, "detail", epccId] as const,

            field: (epccId: string, field: EventFields) =>
                [...queryKeys.users.detail.base(epccId), field] as const,
        },
    },

    events: {
        all: ['events'] as const,
        list: (filters?: Record<string, any>, view?: string) =>
            [...queryKeys.events.all, "list", filters, view] as const,
        detail: {
            base: (id: number) =>
                [...queryKeys.events.all, "detail", id] as const,

            field: (id: number, field: EventFields) =>
                [...queryKeys.events.detail.base(id), field] as const,
        },
    },
};
