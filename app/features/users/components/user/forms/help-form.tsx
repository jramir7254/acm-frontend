import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, FormInput, TextAreaInput, SelectInput, type SelectInputValues } from '@/components/input'
import { useHelp } from '@/features/events/hooks/event/mutations'
const createVals = (val: string[]): SelectInputValues => {
    return val.map(i => ({ name: i, id: i }))
}

const types = createVals([
    // Account & Access
    'Login or account issue',
    'Cannot update profile',
    'Request instructor access',

    // Courses & Content
    'Missing course',
    'Missing attendance',
    'Course content issue',

    // Technical Issues
    'Site crashes or errors',
    'Site not displaying correctly (UI/Device issue)',
    'Slow performance',

    // Feedback & Suggestions
    'Suggestion for site',
    'Feature request',

    // General
    'Other',
])

export function HelpForm() {
    const sendHelp = useHelp()

    const FormSchema = z.object({
        type: z.string().min(1, { error: "Please choose an option" }),
        title: z.string().min(1, { error: "Cannot be empty" }).max(50, { error: 'Must be less than 50 characters' }),
        text: z.string().min(1, { error: "Cannot be empty" }).max(500, { error: 'Must be less than 500 characters' }),

    });

    const formOptions = {
        defaultValues: {
            type: "",
            title: "",
            text: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    }


    const onSubmit = async (values: typeof FormSchema) => {
        console.log({ values })
        sendHelp(values)
    }


    return (
        <Form
            onSubmit={onSubmit}
            schema={FormSchema}
            className='space-y-5'
            {...formOptions}
        >

            <SelectInput name='type' label='Type of request' values={types} className='w-full' />
            <FormInput name='title' label='Subject' />
            <TextAreaInput name='text' label='Message' />
            <SubmitButton>
                Submit
            </SubmitButton>
        </Form>
    )
}