import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, TextAreaInput, RadioInput } from '@/components/input'
import { useEventContext } from '@/features/events/context/event-context'
import { useOverlay } from '@/components/ui'
import { Separator } from '@/components/primitives/separator'
import { useEventFeedback } from '../../hooks/use-user'

const Likert5 = (labels: string[]) => [
    { name: labels[4], id: 5 },
    { name: labels[3], id: 4 },
    { name: labels[2], id: 3 },
    { name: labels[1], id: 2 },
    { name: labels[0], id: 1 },
];

// Q1: Satisfaction
const q1 = [
    { name: 'Very Dissatisfied', id: 1 },
    { name: 'Somewhat Dissatisfied', id: 2 },
    { name: 'Neutral', id: 3 },
    { name: 'Satisfied', id: 4 },
    { name: 'Very Satisfied', id: 5 },
];

// Q2: Instructor clarity/engagement
const q2 = [
    { name: 'Not Clear', id: 1 },
    { name: 'Slightly Clear', id: 2 },
    { name: 'Moderately Clear', id: 3 },
    { name: 'Very Clear', id: 4 },
    { name: 'Extremely Clear', id: 5 },
];


// Q3: Relevance
const q3 = [
    { name: 'Not Relevant', id: 1 },
    { name: 'Slightly Relevant', id: 2 },
    { name: 'Somewhat Relevant', id: 3 },
    { name: 'Very Relevant', id: 4 },
    { name: 'Extremely Relevant', id: 5 },
];

// Q4: Likelihood of applying learning
const q4 = [
    { name: 'Not Likely', id: 1 },
    { name: 'Slightly Likely', id: 2 },
    { name: 'Somewhat Likely', id: 3 },
    { name: 'Very Likely', id: 4 },
    { name: 'Extremely Likely', id: 5 },
];



export default function FeedbackForm() {
    const { open, setOpen } = useOverlay()
    const feedback = useEventFeedback()
    const eventContext = useEventContext()
    const eventId = eventContext?.id


    const FeedbackSchema = z.object({
        question1: z.enum(["1", "2", "3", "4", "5"], {
            error: "Please select an option"
        }),
        question2: z.enum(["1", "2", "3", "4", "5"], {
            error: "Please select an option"
        }),
        question3: z.enum(["1", "2", "3", "4", "5"], {
            error: "Please select an option"
        }),
        question4: z.enum(["1", "2", "3", "4", "5"], {
            error: "Please select an option"
        }),
        question5: z.string().optional(),
    });



    const formOptions = {
        mode: "onSubmit",       // ✅ only validate on submit
        reValidateMode: "onSubmit", // ✅ don’t revalidate on blur/change after submit
        defaultValues: {
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: "",
        }
    }


    const onSubmit = async (values: any) => {
        if (!eventId) {
            toast.error("Event not found.")
            return
        }

        await feedback.mutateAsync({ eventId, form: values })

        setOpen(false)
    }


    return (
        <Form
            onSubmit={onSubmit}
            className='font-fsans'
            schema={FeedbackSchema}
            resetOn={[open]}
            {...formOptions}
        >
            <div className='space-y-5 overflow-auto max-h-[45vh] md:max-h-[60vh]'>
                <Separator />
                <RadioInput name='question1' values={q1} label='Overall, how satisfied are you with this workshop?' />
                <Separator />
                <RadioInput name='question2' values={q2} label='How clear and engaging was the instructor’s delivery?' />
                <Separator />
                <RadioInput name='question3' values={q3} label='How relevant was the content to your studies/work/professional goals?' />
                <Separator />
                <RadioInput name='question4' values={q4} label='How likely are you to apply what you learned in your work/studies?' />
            </div>
            <div className='mt-5'>
                <TextAreaInput name='question5' label='What is one thing you found most valuable, and one thing that could be improved? (Optional)' />
            </div>

            <SubmitButton allowSubmitOn={{ isValid: true }}>
                Submit
            </SubmitButton>
        </Form>
    )
}
