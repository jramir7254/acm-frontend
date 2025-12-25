import React from 'react'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'
import { Textarea } from '@/components/input'
import { useIsMobile } from '@/hooks'
import type { ReactFeedbackForm } from '../feedback-form'
import { Paragraph } from '@/components/text/typography'


export function TextField({ form }: ReactFeedbackForm) {
    const isMobile = useIsMobile()

    return (
        <Controller
            name='question5'
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor='question5'>
                        <Paragraph>
                            What is one thing you found most valuable, and one thing that could be improved? (Optional)
                        </Paragraph>
                        {fieldState.invalid && !isMobile && (
                            <FieldError className='ml-auto' errors={[fieldState.error]} />
                        )}
                    </FieldLabel>
                    <Textarea
                        id='question5'
                        className="resize-none h-25 text-xs"
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
