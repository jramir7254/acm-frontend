import React from 'react'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { DateTimePickerInput } from '@/components/input/calendar-input'

import { Controller, type FieldValues, type UseFormReturn } from 'react-hook-form'

import type { Path } from 'react-hook-form'


export function DateInput<T extends FieldValues>({
    form,
    name,
    label
}: {
    form: UseFormReturn<T>,
    name: Path<T>,
    label: string
}) {


    return (
        <Controller
            key={name}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={name}>
                        {label} <span className='text-destructive'>*</span>
                    </FieldLabel>
                    <DateTimePickerInput
                        className='text-xs'
                        value={field.value}
                        onChange={field.onChange}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
