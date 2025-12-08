import type { EventFields } from "../types/event";




export const eventKeys = {
    all: ['events'] as const,

    lists: {
        base: () =>
            [...eventKeys.all, "list"] as const,
        report: () =>
            [...eventKeys.all, "list", "report"] as const,

    },

    detail: {
        base: (id: number) =>
            [...eventKeys.all, "detail", id] as const,

        field: (id: number, field: EventFields) =>
            [...eventKeys.detail.base(id), field] as const,
    },
};

