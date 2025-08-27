// features/events/context/EventContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useEventById } from "./index-context";
import { useEventStatus } from "../hooks/use-status";
import { formatDateAndTime } from "@/utils/format-date";

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

const EventContext = createContext<EventView | null>(null);
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
    const formatted = useMemo(() => formatDateAndTime(e.startAt, e.endAt), [e.startAt, e.endAt]);

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
        past: !isLive && end.getTime() < Date.now(),
        formatted,
    }), [e.id, e.title, start, end, isLive, formatted]);

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
