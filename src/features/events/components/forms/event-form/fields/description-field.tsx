import React from 'react'
import type { EventReactForm } from '..'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'
import { Textarea } from '@/components/input'
import { useIsMobile } from '@/hooks'


export function DescriptionField({ form }: EventReactForm) {
    const isMobile = useIsMobile()

    return (
        <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit flex-1'>
                    <FieldLabel htmlFor='description'>
                        Description <span className='text-destructive'>*</span>
                        {fieldState.invalid && !isMobile && (
                            <FieldError className='ml-auto' errors={[fieldState.error]} />
                        )}
                    </FieldLabel>
                    <Textarea
                        id='description'
                        className="resize-none h-[200px] md:h-full text-xs"
                        {...field}
                    />
                    {fieldState.invalid && isMobile && (
                        <FieldError className='ml-auto' errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}
