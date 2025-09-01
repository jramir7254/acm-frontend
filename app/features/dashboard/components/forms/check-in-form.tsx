import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, OtpInput, GlobalFormError } from '@/components/input'
import { useCheckIn } from '../../hooks/use-user'
import { useEventContext } from '@/features/events/context/event-context'

export default function CheckInForm({ setOpen, open }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean }) {

    const eventContext = useEventContext()
    const eventId = eventContext?.id
    const checkIn = useCheckIn()

    const FormSchema = z.object({
        code: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    });

    const formOptions = {
        mode: "onSubmit",       // ✅ only validate on submit
        reValidateMode: "onSubmit", // ✅ don’t revalidate on blur/change after submit
    }


    const onSubmit = async (values: any) => {
        if (!eventId) {
            toast.error("Event not found.")
            return
        }
        await checkIn.mutateAsync({ eventId, form: values })
        toast.success("Succesfully Checked-In for Event")
        setOpen(false)
    }


    return (
        <Form
            onSubmit={onSubmit}
            schema={FormSchema}
            defaultValues={{ code: "" }}
            resetOn={[open]}
            {...formOptions}
        >
            <OtpInput name='code' label='Enter the 6 digit code' length={6} groups={2} />
            <SubmitButton>
                Submit
            </SubmitButton>
        </Form>
    )
}
