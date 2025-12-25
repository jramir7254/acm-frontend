import React from 'react'
import { Controller } from 'react-hook-form'
import { type EventReactForm } from '..'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { DateTimePickerInput } from '@/components/input/calendar-input'

export function DatetimeFields({ form }: EventReactForm) {

    return (['startAt', 'endAt'] as const).map((f) => (
        <Controller
            key={f}
            name={f}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={f}>
                        {`${f === 'startAt' ? 'Start' : 'End'} Date`} <span className='text-destructive'>*</span>
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
    ))
}
