// events-context.tsx
import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { eventsKeys } from "@/features/events/useEvents";
import * as EventsApi from "@/features/events/events"; // re-export listEventsPublic
import type { Event } from "@/types";
// import { useAuth } from "@/features/auth/context/AuthContext";

type EventCtx = { events: Event[] };
const Ctx = createContext<EventCtx | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
    // const { loading } = useAuth()

    // if (loading) return null

    const { data, isLoading } = useQuery({
        queryKey: eventsKeys.all,          // stable cache key
        queryFn: EventsApi.listEvents, // ALWAYS public client
        staleTime: 60_000,
        gcTime: 5 * 60_000,
    });

    if (isLoading) return <p>Loading…</p>;

    const events = Array.isArray(data) ? data : [];
    const value = useMemo(() => ({ events }), [events]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEvents() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useEvents must be used within EventProvider");
    return v;
}
