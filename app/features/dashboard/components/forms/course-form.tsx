import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, FormInput, GlobalFormError } from '@/components/input'
import { useAddCourse } from '../../hooks/use-courses'

export function CourseForm() {
    const addCourse = useAddCourse()

    const FormSchema = z.object({
        firstName: z.string().min(1, { message: "Cannot be empty" }),
        lastName: z.string().min(1, { message: "Cannot be empty" }),
        title: z.string().min(1, { message: "Cannot be empty" }),
        subject: z.string().min(1, { message: "Cannot be empty" }),
        courseNumber: z.string().min(1, { message: "Cannot be empty" }),
    });

    const formOptions = {
        defaultValues: {
            firstName: "",
            lastName: "",
            title: "",
            subject: "",
            courseNumber: ""
        },
        mode: "onSubmit",       // ✅ only validate on submit
        reValidateMode: "onSubmit", // ✅ don’t revalidate on blur/change after submit
    }


    const onSubmit = async (values: any) => {
        await addCourse.mutateAsync(values)
    }


    return (
        <Form
            onSubmit={onSubmit}
            schema={FormSchema}
            {...formOptions}
        >
            <div className='flex'>
                <FormInput name='firstName' label='Instructor First Name' />
                <FormInput name='lastName' label='Instructor Last Name' />
            </div>
            <FormInput name='title' label='Course Title' />
            <FormInput name='subject' label='Subject' />
            <FormInput name='courseNumber' label='Course Number' />
            <SubmitButton>
                Submit
            </SubmitButton>
        </Form>
    )
}
