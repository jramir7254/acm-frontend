import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/primitives/input-otp'
import { Button } from '@/components/primitives/button'

export function CheckInForm({ handleSubmit }: { handleSubmit: (form: { code: string }) => Promise<void> }) {


    const formSchema = z.object({
        code: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    const onSubmit = async (val: z.infer<typeof formSchema>) => {
        try {
            await handleSubmit(val)
        } catch {
            form.setError('root', {
                type: 'server',
                message: 'msg'
            })
        }

    }





    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit">
            <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            Enter the 6 digit code
                        </FieldLabel>
                        <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                {[0, 1, 2].map(n => (
                                    <InputOTPSlot
                                        key={`checkin-[${n}]`}
                                        index={n}
                                        className={`
                                            ${form.formState.errors.root ? 'border-red-900 text-red-700 animate-shake' : ''}
                                        `}
                                    />
                                ))}

                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                {[3, 4, 5].map(n => (
                                    <InputOTPSlot
                                        key={`checkin-[${n}]`}
                                        index={n}
                                        className={`
                                            ${form.formState.errors.root ? 'border-red-900 text-red-700 animate-shake' : ''}
                                        `}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Button type="submit" className="mt-3 w-full md:w-auto">
                Submit
            </Button>
        </form>
    )
}
