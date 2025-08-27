
export function formatDateAndTime(startDate: string | Date, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dts = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
        start.getSeconds() || 0
    );
    const dte = new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
        end.getSeconds() || 0
    );

    const dateFormatted = dts.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const timeFormatted = dts.toLocaleTimeString([], {
        hour: "numeric",   // 👈 no leading zero
        minute: "2-digit",
        hour12: true
    });

    const timeFormattedE = dte.toLocaleTimeString([], {
        hour: "numeric",   // 👈 no leading zero
        minute: "2-digit",
        hour12: true
    });

    return { date: dateFormatted, time: timeFormatted.concat(' - ', timeFormattedE) };
}
