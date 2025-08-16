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

function formatDate(date: Date | undefined) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function isValidDate(date: Date | undefined) {
    return !!date && !isNaN(date.getTime());
}

type DatePickerInputProps = {
    id?: string;
    placeholder?: string;
    value?: Date;                        // <- RHF field.value (Date)
    onChange: (date?: Date) => void;     // <- RHF field.onChange
    disabled?: boolean;
    className?: string;
};

export function DatePickerInput({
    id = "date",
    placeholder = "June 01, 2025",
    value,
    onChange,
    disabled,
    className,
}: DatePickerInputProps) {
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState<Date | undefined>(value);
    const [text, setText] = React.useState<string>(formatDate(value));

    // keep local text/month in sync when external value changes
    React.useEffect(() => {
        setText(formatDate(value));
        if (value) setMonth(value);
    }, [value]);

    return (
        <div className={`relative flex gap-2 ${className ?? ""}`}>
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
                    // normalize the display if a valid date was typed
                    if (value) setText(formatDate(value));
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
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        disabled={disabled}
                    >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        className="p-3 pointer-events-auto"
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(d) => {
                            onChange(d);
                            setOpen(false);
                        }}
                        autoFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
