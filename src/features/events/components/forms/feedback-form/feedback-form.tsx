
import { z } from "zod"

import { Controller, useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RadioFields } from './fields/radio-fields'
import { TextField } from './fields/text-field'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { logger } from '@/lib/logger'

const formSchema = z.object({
    question1: z.enum(["1", "2", "3", "4", "5"], {
        error: "Please select an option",
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
    question5: z.string().max(250, { error: "Must be less than 250 characters" }).optional(),
});


export type FeedbackFormValues = z.infer<typeof formSchema>;

export type ReactFeedbackForm = {
    form: UseFormReturn<FeedbackFormValues>; // <-- critical for IntelliSense
};


export default function FeedbackForm({ handleSubmit }: { handleSubmit: (form: FeedbackFormValues) => Promise<void>, }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question1: undefined,
            question2: undefined,
            question3: undefined,
            question4: undefined,
            question5: "",
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })




    return (
        <ScrollArea className='h-[50vh] lg:pr-5'>
            <form id='feedback-form' onSubmit={form.handleSubmit(handleSubmit)} >
                <div className='space-y-5  '>
                    <RadioFields form={form} />
                </div>
                <div className='mb-15 mt-5'>
                    <TextField form={form} />
                </div>
                {/* <Button type="submit" className="mt-3 w-full md:w-auto">
                Submit
            </Button> */}
            </form>
        </ScrollArea>

    )
}
