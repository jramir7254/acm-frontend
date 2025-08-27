import { useEffect, useState } from "react";

function isHappening(startAt: string | Date, endAt: string | Date) {
    const now = new Date();
    return now >= new Date(startAt) && now <= new Date(endAt);
}


export function useEventStatus(startAt: string | Date, endAt: string | Date) {
    const [isLive, setIsLive] = useState(() => isHappening(startAt, endAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLive(isHappening(startAt, endAt));
        }, 30_000); // check every 30 seconds (tweak as needed)

        return () => clearInterval(interval);
    }, [startAt, endAt]);

    return isLive;
}
