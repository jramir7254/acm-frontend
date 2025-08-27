// select-input.tsx
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
import type { ControllerRenderProps } from "react-hook-form"

type SelectInputProps = {
    className?: string
    placeholder?: string
    label?: string
    values: Array<{ id: string, name: string }>
    field: ControllerRenderProps

}


export function SelectInput({
    className,
    placeholder,
    label,
    values,
    field
}: SelectInputProps) {

    return (
        <Select disabled={field.disabled} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={cn("w-[180px]", className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {values.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
