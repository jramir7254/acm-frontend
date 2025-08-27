// features/events/context/EventsIndexProvider.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useEvents } from "../hooks/use-events"; // your list query (array of events)

export type Event = {
    id: string | number,
    imageUrl: string,
    startAt: string,
    endAt: string,
    code: string,
    time: string,
    title: string,
    location: string,
    host: string,
    description: string,
    past: boolean,
    isRsvpd?: boolean | undefined
}



type Ctx = {
    list: Event[];
    byId: Map<string, Event>;
    isLoading: boolean;
    isFetching: boolean;
};

const EventsIndexContext = createContext<Ctx | null>(null);

export const EventsIndexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: events = [], isLoading, isFetching } = useEvents();


    // Build once per list change
    const value = useMemo<Ctx>(() => ({
        list: events,
        byId: new Map(events.map(e => [String(e.id), e])),
        isLoading,
        isFetching,
    }), [events, isLoading, isFetching]);

    return (
        <EventsIndexContext.Provider value={value}>
            {children}
        </EventsIndexContext.Provider>
    );
};

// Hook to get the whole list (already cached)
export function useEventsList() {
    const ctx = useContext(EventsIndexContext);
    return ctx?.list ?? [];
}

export function useEventsLoading() {
    const ctx = useContext(EventsIndexContext);
    return { isLoading: !!ctx?.isLoading, isFetching: !!ctx?.isFetching };
}

// O(1) lookup by id (stringified for robustness)
export function useEventById(id?: string | number) {
    const ctx = useContext(EventsIndexContext);
    if (!ctx || id == null) return undefined;
    return ctx.byId.get(String(id));
}
