
import { Checkbox } from "@/components/primitives/checkbox"

import React from 'react'
import type { ControllerRenderProps } from "react-hook-form"

type SelectInputProps = {
    className?: string
    placeholder?: string
    label?: string
    values: Array<{ id: string, name: string }>
    field: ControllerRenderProps

}



export function CheckboxInput({
    className,
    placeholder,
    label,
    values,
    field
}: SelectInputProps) {
    return (
        <Checkbox
            checked={field.value?.includes(item.id)}
            onCheckedChange={(checked) => {
                return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value?.filter(
                            (value) => value !== item.id
                        )
                    )
            }
            }
        />
    )
}
export function CheckboxInputGroup({
    className,
    placeholder,
    label,
    values,
    field
}: SelectInputProps) {
    return (
        <Checkbox
            checked={field.value?.includes(item.id)}
            onCheckedChange={(checked) => {
                return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value?.filter(
                            (value) => value !== item.id
                        )
                    )
            }
            }
        />
    )
}
