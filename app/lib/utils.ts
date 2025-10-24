import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type SelectInputValues } from "@/components/input"
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
