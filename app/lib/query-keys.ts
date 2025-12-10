import type { EventFields } from "@/features/events/types/event";

export type UserFields = 'rsvps' | 'attendance' | 'points' | 'events'


export const queryKeys = {
    me: {
        all: ['me'] as const,
        base: () => [...queryKeys.me.all, "base"] as const,
        field: (field: UserFields) => [...queryKeys.me.all, "field", field] as const,
    },

    users: {
        all: ["users"] as const,
        list: (filters?: Record<string, any>) =>
            [...queryKeys.users.all, "list", filters] as const,
        detail: {
            base: (id: number) =>
                [...queryKeys.users.all, "detail", id] as const,

            field: (id: number, field: EventFields) =>
                [...queryKeys.users.detail.base(id), field] as const,
        },
    },

    events: {
        all: ['events'] as const,
        list: (filters?: Record<string, any>) =>
            [...queryKeys.events.all, "list", filters] as const,
        detail: {
            base: (id: number) =>
                [...queryKeys.events.all, "detail", id] as const,

            field: (id: number, field: EventFields) =>
                [...queryKeys.events.detail.base(id), field] as const,
        },
    },
};
