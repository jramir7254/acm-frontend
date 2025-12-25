import React from 'react'
import type { EventReactForm } from '..'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'
import { Textarea } from '@/components/input'
import { camelToTitleCase } from '@/lib/utils'

type ExtraFields = 'externalLink' | 'resources' | 'requirements'

export function ExtraFields({ name, form }: EventReactForm & { name: ExtraFields }) {

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={name}>
                        {camelToTitleCase(name)}
                    </FieldLabel>
                    <Input
                        id={name}
                        {...field}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
