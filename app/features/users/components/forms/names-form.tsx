
import z from 'zod';
import { Controller, useForm, type UseFormReturn } from 'react-hook-form';
import type { BaseUser } from '@/features/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { Label } from '@/components/ui/label';
import { Field } from '@/components/ui/field';
import { CourseSelect } from '@/features/edu/components/course-select';
import { logger } from '@/lib/logger';


import { userNamesSchema } from '../../lib/schemas';

export type ProfileFormValues = z.infer<typeof userNamesSchema>;


export type ReactProfileForm = {
    form: UseFormReturn<ProfileFormValues>; // <-- critical for IntelliSense
};

export default function NamesForm({
    handleSubmit,
    user,

}: {
    handleSubmit: (form: ProfileFormValues) => Promise<void>,
    user: BaseUser
}) {

    const [isUpdating, setIsUpdating] = useState(false)

    const form = useForm<z.infer<typeof userNamesSchema>>({
        resolver: zodResolver(userNamesSchema),
        defaultValues: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
        },
        mode: 'onChange',
        shouldUnregister: true,
        disabled: !isUpdating
    })

    useEffect(() => {
        form.reset();
        form.clearErrors();

    }, [isUpdating]);

    const onSubmit = async (values: z.infer<typeof userNamesSchema>) => {
        try {

            logger.debug(values, user.courses)
            await handleSubmit(values)
            form.reset(values)
            setIsUpdating(false)
        } catch (error) {
            logger.error(error)
            setIsUpdating(false)

        }
    }



    return (
        <form id='feedback-form' className='flex flex-col h-full ' onSubmit={form.handleSubmit(onSubmit)} >
            <div className="flex gap-5">
                {([{ name: 'firstName', label: 'First Name' }, { name: 'lastName', label: 'Last Name' }] as const).map(field => (
                    <FormInput key={field.name} name={field.name} form={form} label={field.label} />
                ))}
            </div>



            <div className='flex mt-10'>
                <div className='ml-auto flex gap-2'>
                    <Button
                        type='button'
                        variant={'outline'}
                        onClick={() => {
                            setIsUpdating(false);
                        }}
                        hidden={!isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={(isUpdating && !form.formState.isDirty) || form.formState.isSubmitting}
                        type={isUpdating ? "submit" : "button"}
                        onClick={() => {
                            if (!isUpdating) setIsUpdating(true); // toggle into edit mode
                        }}
                    >
                        {isUpdating ? 'Save' : 'Update'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
