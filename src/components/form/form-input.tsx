import React from 'react'
import { Controller, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'

import type { Path } from 'react-hook-form'

// type FormInput<T> = {
//     label: string,
//     name: Path<T>,
// }

export function FormInput<T extends FieldValues>({
    form,
    name,
    label,
    type
}: {
    form: UseFormReturn<T>,
    name: Path<T>,
    label: string,
    type?: React.HTMLInputTypeAttribute
}) {


    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <Input
                        id={name}
                        type={type || 'text'}
                        {...field}
                        //    value={field.value ?? ''} // Prevents React warning
                        onChange={(e) => field.onChange(type === 'number' ? e.target.valueAsNumber : e.target)}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
