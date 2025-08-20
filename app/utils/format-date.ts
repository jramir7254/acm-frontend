
export function formatDateAndTime(dateInput: string | Date, timeStr: string) {
    const [h = "0", m = "0", s = "0"] = timeStr.split(":");
    const base = new Date(dateInput);

    const dt = new Date(
        base.getFullYear(),
        base.getMonth(),
        base.getDate(),
        Number(h),
        Number(m),
        Number(s) || 0
    );

    const dateFormatted = dt.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const timeFormatted = dt.toLocaleTimeString([], {
        hour: "numeric",   // 👈 no leading zero
        minute: "2-digit",
        hour12: true
    });

    return { date: dateFormatted, time: timeFormatted };
}
