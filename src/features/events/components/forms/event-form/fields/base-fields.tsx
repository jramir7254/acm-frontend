import React from 'react'
import type { EventReactForm } from '..'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'
import { useIsMobile } from '@/hooks'

export function BaseFields({ form }: EventReactForm) {

    const isMobile = useIsMobile()

    return (['title', 'host', 'location'] as const).map((f) => (
        <Controller
            key={f}
            name={f}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={f}>
                        {f.charAt(0).toUpperCase() + f.substring(1)} <span className='text-destructive'>*</span>
                        {fieldState.invalid && !isMobile && (
                            <FieldError className='ml-auto' errors={[fieldState.error]} />
                        )}
                    </FieldLabel>
                    <Input
                        className='text-sm'
                        {...field}
                    />
                    {fieldState.invalid && isMobile && (
                        <FieldError className='ml-auto' errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    ))
}
