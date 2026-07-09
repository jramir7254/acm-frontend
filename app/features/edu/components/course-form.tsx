import React, { useState } from 'react'

import { toast } from "sonner"
import { z } from "zod"
import { useCreateOrUpdateCourse } from '@/features/edu/hooks/mutations'
import { FormInput } from '@/components/form/form-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { Course } from '../types';

const formSchema = z.object({
    firstName: z.string().min(1, { message: "Cannot be empty" }),
    lastName: z.string().min(1, { message: "Cannot be empty" }),
    title: z.string().min(1, { message: "Cannot be empty" }),
    subject: z.string().min(1, { message: "Cannot be empty" }),
    courseNumber: z.string().min(1, { message: "Cannot be empty" }),
});
export function CourseForm({ course }: { course?: Course }) {
    const addCourse = useCreateOrUpdateCourse(course?.id)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: course?.instructorFirstName || "",
            lastName: course?.instructorLastName || "",
            title: course?.title || "",
            subject: course?.subject || "",
            courseNumber: course?.courseNumber || ""
        },
        mode: "onSubmit",       // ✅ only validate on submit
        reValidateMode: "onSubmit", // ✅ don’t revalidate on blur/change after submit
    })




    const onSubmit = async (values: any) => {
        await addCourse.mutateAsync(values)
    }


    return (
        <form className="grid flex-1 auto-rows-min gap-6 px-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput form={form} label='Instructor First Name' name='firstName' />
            <FormInput form={form} label='Instructor Last Name' name='lastName' />
            <FormInput form={form} label='Course Title' name='title' />
            <FormInput form={form} label='Course Subject' name='subject' />
            <FormInput form={form} label='Course Number' name='courseNumber' />
            <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </form>
    )
}
