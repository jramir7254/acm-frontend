function areSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function formatDateAndTime(startDate: string | Date, endDate: string | Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",   // no leading zero
        minute: "2-digit",
        hour12: true
    });

    if (areSameDay(start, end)) {
        // Same day: show one date and a time range
        return {
            date: dateFormatter.format(start),
            time: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`
        };
    } else {
        // Different days: show full date ranges
        return {
            date: `${dateFormatter.format(start)} – ${dateFormatter.format(end)}`,
            time: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`
        };
    }
}
