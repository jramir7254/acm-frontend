// features/events/context/EventContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useEventById } from "./index-context";
import { useEventStatus } from "../hooks/use-status";
import { formatDateAndTime } from "@/utils/format-date";
import { logger } from "@/lib/logger";
import { } from "date-fns-tz";

type EventView = {
    // base
    id: string | number;
    title: string;
    location: string;
    host: string;
    description: string;
    imageUrl?: string;
    // parsed
    startAt: Date;
    endAt: Date;
    code: string,
    // derived
    isLive: boolean;
    past: boolean;
    formatted: ReturnType<typeof formatDateAndTime>;
    // keep any extra fields you need
}

const EventContext = createContext<EventView | undefined>(undefined);
export const useEventContext = () => useContext(EventContext);

export const EventProvider: React.FC<{
    eventId: string | number;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}> = ({ eventId, fallback = null, children }) => {
    const e = useEventById(eventId);
    if (!e) return <>{fallback}</>;

    const start = useMemo(() => new Date(e.startAt), [e.startAt]);
    const end = useMemo(() => new Date(e.endAt), [e.endAt]);
    const isLive = useEventStatus(start, end);
    const past = useMemo(() => {
        const end = new Date(e.endAt);
        const now = new Date();
        const cutoff = new Date(now.getTime() + 30 * 60 * 1000); // now + 30 min
        return end < cutoff && !isLive;
    }, [e.endAt, isLive]); const formatted = useMemo(() => formatDateAndTime(e.startAt, e.endAt), [e.startAt, e.endAt]);

    logger.debug('Event: ', { id: e.id, past, isLive })

    const value = useMemo<EventView>(() => ({
        id: e.id,
        title: e.title,
        location: e.location,
        imageUrl: e.imageUrl,
        host: e.host,
        description: e.description,
        startAt: start,
        endAt: end,
        isLive,
        code: e.code,
        past,
        formatted,
    }), [e.id, e.title, start, end, isLive, formatted]);

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
