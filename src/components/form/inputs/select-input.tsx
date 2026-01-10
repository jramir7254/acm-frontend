import { Label } from '@/components/primitives/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectGroup,
    SelectValue
} from '@/components/primitives/select'

import { snakeToTitle } from '@/lib/utils'
import React from 'react'
import { Controller, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'

import type { Path } from 'react-hook-form'

export function SelectInput<T extends FieldValues>({
    form,
    children,
    name,
    label,
}: {
    form: UseFormReturn<T>,
    children: React.ReactNode,
    name: Path<T>,
    label: string,
}) {

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>

                    <Label htmlFor={name}>{label}<span className='text-destructive'>*</span></Label>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange} >
                        <SelectTrigger id={name} className="max-w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            {children}
                        </SelectContent>
                    </Select>
                </Field>
            )}
        />
    )
}


export type SelectOption = {
    value: string
    label: string
}


export function SelectOptions({
    options,
    label,
}: {
    options: SelectOption[],
    label?: string,
}) {
    return (
        <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map(option => (
                <SelectItem value={option.value}>{option.label}</SelectItem>
            ))}
        </SelectGroup>
    )
}
