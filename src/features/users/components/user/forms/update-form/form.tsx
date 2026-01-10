
import z from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type { BaseUser } from '@/features/users/types';
import { CourseField } from './fields/course-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from './fields/text-field';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/primitives/separator';
import { Button } from '@/components/primitives/button';
import { FormInput } from '@/components/form/form-input';

export const profileSchema = (admin: boolean) => z.object({
    ...(admin && { epccId: z.string().min(8).max(8), epccEmail: z.email() }),
    firstName: z.string().min(1, "First name cannot be empty").max(80, "cannot be more than 80 characters"),
    lastName: z.string().min(1, "Last name cannot be empty").max(80, "cannot be more than 80 characters"),
    course: z.string(),
})

export type ProfileFormValues = z.infer<ReturnType<typeof profileSchema>>;


export type ReactProfileForm = {
    form: UseFormReturn<ProfileFormValues>; // <-- critical for IntelliSense
};

export default function ProfileForm({
    handleSubmit,
    admin,
    user,

}: {
    handleSubmit: (form: ProfileFormValues) => Promise<void>,
    admin?: boolean,
    resetOn?: any[],
    user: BaseUser
}) {

    const formSchema = profileSchema(!!admin)
    const [isUpdating, setIsUpdating] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            course: String(user.courseId || ""),
            ...(admin ? { epccId: user.epccId, epccEmail: user.epccEmail } : {})
        },
        mode: 'onChange',
        shouldUnregister: true,
        disabled: !isUpdating
    })

    useEffect(() => {
        form.reset();
        form.clearErrors();

    }, [isUpdating]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await handleSubmit(values)
        form.reset(values)
        setIsUpdating(false)
    }



    return (
        <form id='feedback-form' className='flex flex-col h-full ' onSubmit={form.handleSubmit(onSubmit)} >
            {admin && <div className="flex gap-5">
                {([{ name: 'epccId', label: 'EPCC ID' }, { name: 'epccEmail', label: 'EPCC Email' }] as const).map(field => (
                    <FormInput key={field.name} name={field.name} form={form} label={field.label} />
                ))}
            </div>}
            <div className="flex gap-5">
                {(['firstName', 'lastName'] as const).map(field => (
                    <TextField key={field} name={field} form={form} />
                ))}
            </div>

            <div className='mt-5'>
                <CourseField form={form} />
            </div>

            <div className='flex mt-auto'>
                {/* <Separator /> */}
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
                        disabled={isUpdating && !form.formState.isDirty}
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
