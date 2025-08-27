// select-input.tsx
import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/primitives/select"
import { cn } from "@/lib/utils"
import { titleToKebab, kebabToTitle } from "@/utils/format-string"

type SelectInputProps = {
    className?: string
    placeholder?: string
    label?: string
    values: Array<string> | Array<Object>
    value?: string | undefined                 // <-- add this
    onChange: (val?: unknown) => void          // RHF field.onChange
    store?: "kebab" | "title"                  // optional: how to store in form
    disabled?: boolean;              // 🔑 new

}

function hasObjects(arr: Array<any>) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }

    for (let i = 0; i < arr.length; i++) {
        // Check if the element is an object and not null (as typeof null is 'object')
        if (typeof arr[i] === 'object' && arr[i] !== null) {
            return true; // Found an object
        }
    }
    return false; // No objects found
}

export function SelectInput({
    className,
    placeholder,
    label,
    values,
    value,
    onChange,
    disabled = false,
    store = "kebab",
}: SelectInputProps) {
    const isPlain = !hasObjects(values)
    // convert outgoing value depending on chosen storage format
    const handleChange = (v: string) => {
        if (!isPlain) onChange(v)
        else if (store === "kebab") onChange(v)                  // store kebab-case
        else onChange(kebabToTitle(v))                      // store original-title
    }

    // If storing titles in form, we need to map the incoming value to kebab
    const internalValue =
        store === "kebab" ? value : (value ? titleToKebab(String(value)) : undefined)


    return (
        <Select disabled={disabled} onValueChange={handleChange}>
            <SelectTrigger className={cn("w-[180px]", className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {values.map((t) => (
                        <SelectItem key={isPlain ? titleToKebab(t) : t.id} value={isPlain ? titleToKebab(t) : t.id}>
                            {isPlain ? t : t.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
