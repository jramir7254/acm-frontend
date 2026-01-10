import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type SelectInputValues } from "@/components/input"
import type { Course } from "@/features/edu/types"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function buildSelectVals<T extends string>(vals: Array<T>): SelectInputValues {
    return vals.map(v => ({ id: v, name: snakeToTitle(v) }))
}

export const kebabToTitle = (kebabStr: string): string => {
    if (!kebabStr || kebabStr.length === 0) return ""
    return kebabStr.split('-').map(i => i.charAt(0).toUpperCase().concat(i.substring(1))).join(" ").trim()
}

export const snakeToTitle = (kebabStr: string): string => {
    if (!kebabStr || kebabStr.length === 0) return ""
    return kebabStr.split('_').map(i => i.charAt(0).toUpperCase().concat(i.substring(1))).join(" ").trim()
}

export function camelToTitleCase(camelCase: string) {
    if (!camelCase) return ""
    // Insert space before all uppercase letters (except the first one)
    const spaced = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Capitalize the first letter of the entire string
    const titled = spaced.charAt(0).toUpperCase() + spaced.slice(1);

    return titled;
}


export function capitalize(value: string | undefined) {
    if (!value) return ""
    const first = value.charCodeAt(0)
    const upperFirst = first >= 97 && first <= 122 ? String.fromCharCode(first - 32) : value[0]
    return value.length === 1 ? upperFirst : upperFirst + value.slice(1)
}



export function createCourseName(course: Course | undefined) {
    if (course === undefined) return null
    const { courseNumber, instructorLastName, subject } = course
    return courseNumber === '-1' ? "None/Graduated" : `[${instructorLastName}] ${subject} ${courseNumber}`
}


type TimeParams = {
    start: string,
    end: string,
    margin: number
}


export function isTimeWithin({ start, end, margin }: TimeParams) {
    const now = new Date()
    const startDate = new Date(start)
    const endDate = new Date(end)

    startDate.setMinutes(startDate.getMinutes() - margin)
    endDate.setMinutes(endDate.getMinutes() + margin)

    return now > startDate && now < endDate
}




function areSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function formatDateAndTime(startDate: string | Date, endDate: string | Date, simple?: false) {
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

    if (simple) return {
        date: dateFormatter.format(start),
        time: timeFormatter.format(start)
    }

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
