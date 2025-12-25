import { useEffect, useState } from "react";

function isHappening(startAt: string | Date, endAt: string | Date) {
    const now = new Date();

    // Convert to Date
    const start = new Date(startAt);
    const end = new Date(endAt);

    // Add buffer
    const bufferedStart = new Date(start.getTime() - 10 * 60 * 1000); // 10 mins before
    const bufferedEnd = new Date(end.getTime() + 10 * 60 * 1000);     // 10 mins after

    return now >= bufferedStart && now <= bufferedEnd;
}

export function useEventStatus(startAt: string | Date, endAt: string | Date) {
    const [isLive, setIsLive] = useState(() => isHappening(startAt, endAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLive(isHappening(startAt, endAt));
        }, 30_000); // check every 30 seconds

        return () => clearInterval(interval);
    }, [startAt, endAt]);

    return isLive;
}
