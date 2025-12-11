import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, OtpInput, GlobalFormError } from '@/components/input'
import { useCheckIn } from '@/features/events/hooks/event/mutations'
import { useEventContext } from '@/features/events/context/event-context'
import { useOverlay } from '@/components/ui'

export default function CheckInForm() {

    const eventContext = useEventContext()
    const eventId = eventContext?.id
    const checkIn = useCheckIn()
    const { open, setOpen } = useOverlay()

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
