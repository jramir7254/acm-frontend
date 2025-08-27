// calendar-input.tsx
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { Calendar } from "@/components/primitives/calendar";
import { Input } from "@/components/primitives/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/primitives/popover";

function formatDateTime(date?: Date) {
    if (!date) return "";
    return new Date(date).toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}
function isValidDate(d?: Date) {
    return !!d && !isNaN(d.getTime());
}

type DateTimePickerInputProps = {
    id?: string;
    placeholder?: string;
    value?: Date;                    // RHF field.value (Date)
    onChange: (date?: Date) => void; // RHF field.onChange
    disabled?: boolean;
    className?: string;
    timeStepMinutes?: number;        // optional (default 5)
};

export function DateTimePickerInput({
    id = "datetime",
    placeholder = "June 01, 2025, 14:30",
    value,
    onChange,
    disabled,
    className,
    timeStepMinutes = 5,
}: DateTimePickerInputProps) {
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState<Date | undefined>(value);
    const [text, setText] = React.useState<string>(formatDateTime(value));

    // derive "HH:MM" from the date
    const timeStr = React.useMemo(() => {
        if (!value) return "";
        const hh = String(value.getHours()).padStart(2, "0");
        const mm = String(value.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
    }, [value]);

    // keep local text/month in sync when external value changes
    React.useEffect(() => {
        setText(formatDateTime(value));
        if (value) setMonth(value);
    }, [value]);

    function updateDatePart(d?: Date) {
        if (!d) return onChange(undefined);
        // keep current time part if it exists
        const next = value ? new Date(value) : new Date();
        next.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
        onChange(next);
    }

    function updateTimePart(hhmm: string) {
        const [h, m] = hhmm.split(":").map(Number);
        const base = value ? new Date(value) : new Date();
        base.setHours(h ?? 0, m ?? 0, 0, 0);
        onChange(base);
    }

    return (
        <div className={`relative flex gap-2 ${className ?? ""}`}>
            {/* Free-typing input: parses DateTime if user types a valid value */}
            <Input
                id={id}
                value={text}
                placeholder={placeholder}
                className="bg-background pr-10"
                disabled={disabled}
                onChange={(e) => {
                    const raw = e.target.value;
                    setText(raw);
                    const parsed = new Date(raw);
                    if (isValidDate(parsed)) {
                        onChange(parsed);
                        setMonth(parsed);
                    }
                }}
                onBlur={() => {
                    if (value) setText(formatDateTime(value));
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
            />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={`${id}-picker`}
                        type="button"
                        variant="ghost"
                        className="absolute right-0"
                        disabled={disabled}
                    >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date and time</span>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <div className="p-3 pointer-events-auto space-y-3">
                        <Calendar
                            mode="single"
                            selected={value}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(d) => updateDatePart(d ?? undefined)}
                            autoFocus
                        />

                        {/* Time input */}
                        <div className="flex items-center gap-2">
                            <label htmlFor={`${id}-time`} className="text-sm text-muted-foreground">
                                Time
                            </label>
                            <Input
                                id={`${id}-time`}
                                type="time"
                                step={timeStepMinutes * 60}
                                value={timeStr}
                                onChange={(e) => updateTimePart(e.target.value)}
                                className="w-36"
                            />
                            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                Done
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
