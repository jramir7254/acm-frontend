
import { FEEDBACK_QUESTIONS_ARRAY } from '@/lib/constants'

import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Button } from '@/components/primitives/button'
import { RadioGroup, RadioGroupItem } from '@/components/primitives/radio-group'
import { Label } from '@/components/primitives/label'
import { useIsMobile } from '@/hooks'
import type { ReactFeedbackForm } from '../feedback-form'
import { Paragraph } from '@/components/text/typography'
import { Separator } from '@/components/primitives/separator'

export function RadioFields({ form }: ReactFeedbackForm) {
    const isMobile = useIsMobile()

    return FEEDBACK_QUESTIONS_ARRAY.map((q, i) => (
        <>
            <Controller
                key={`question${i + 1}`}
                name={`question${i + 1 as 1 | 2 | 3 | 4}`}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`question${i + 1}`}>
                            <Paragraph className=''>{i + 1}. {q.heading}</Paragraph>
                        </FieldLabel>
                        <RadioGroup
                            className='flex flex-col '
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            {q.options.map((o, i) => (
                                <div className="inline-flex w-full items-center border rounded-lg font-nunit gap-2 p-3">
                                    <RadioGroupItem value={String(i + 1)} id={o} className="peer " />
                                    <Label
                                        htmlFor={o}
                                        className="text-xs lg:text-sm flex justify-center cursor-pointer">
                                        {o}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Separator />
        </>

    ))
}
