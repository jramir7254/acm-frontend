import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog"
import { Button } from '@/components/primitives/button'
import { Separator } from '@/components/primitives/separator'
import { useCurrentSemester } from '@/features/app/use-semester'
import { SelectInput, SelectOptions } from '@/components/form/inputs/select-input'
import { SemesterName } from '@/components/text/semester-name'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FormInput } from '@/components/form/form-input'
import { DateInput } from '@/components/form/inputs/datetime-input'
import { logger } from '@/lib/logger'
import { useChangeSemester } from '../../hooks/use-admin'


const formSchema = z.object({
    season: z.enum(["fall", "summer", "spring"], {
        error: "Please select an option",
    }),
    year: z.number().min(new Date().getFullYear(), { error: "Year cannot be less" }).max(3000, { error: "Year cannot be more" }),
    startDate: z.date({
        error: "Please select an option"
    }),
    endDate: z.date({
        error: "Please select an option"
    }),
});


export type SemesterFormValues = z.infer<typeof formSchema>;

export type ReactFeedbackForm = {
    form: UseFormReturn<SemesterFormValues>; // <-- critical for IntelliSense
};


export default function ChangeSemesterOverlay() {
    const { data: semester } = useCurrentSemester()
    const { mutateAsync } = useChangeSemester()

    const [open, setOpen] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            season: 'spring',
            year: new Date().getFullYear(),
            startDate: new Date(),
            endDate: new Date(),
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        logger.debug(values)
        await mutateAsync(values)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >Change Semester</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Change Role</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex gap-5'>
                    <SemesterName />
                    <Separator orientation='vertical' />

                </div>
                <form id='semester-form' onSubmit={form.handleSubmit(onSubmit)} >
                    <div className='inline-flex items-center'>
                        <SelectInput form={form} name='season' label='Season'>
                            <SelectOptions options={[
                                { value: 'fall', label: 'Fall' },
                                { value: 'spring', label: 'Spring' },
                                { value: 'summer', label: 'Summer' },
                            ]} />
                        </SelectInput>
                        <FormInput form={form} name='year' label='Year' type='number' />
                    </div>

                    <DateInput form={form} name='startDate' label='Start Date' />
                    <DateInput form={form} name='endDate' label='End Date' />
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form='semester-form' type='submit'>
                        {false ? 'Please wait' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
