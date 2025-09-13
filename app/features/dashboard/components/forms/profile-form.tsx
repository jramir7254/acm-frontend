import React, { useEffect, useState } from 'react'
import { useMe, useUpdateMe } from '@/features/auth/hooks/use-me'
import { Form, FormInput, SelectInput, SubmitButton } from '@/components/input';
import { Separator } from '@/components/primitives/separator';
import { useCourses } from '../../hooks/use-courses';
import { type ProfileFormValues, profileSchema } from '../../types/profile-schema';
import { Button } from '@/components/primitives/button';

export default function ProfileForm() {


    const { data: user, isLoading } = useMe();
    const updateMe = useUpdateMe()
    const [changeProfile, setChangeProfile] = useState(false);
    const { data: courses } = useCourses()

    if (!user || !courses) return null

    const defaultValues = {
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        course: user.courseId ? String(user.courseId) : "", // 👈 safe default
    }


    const formOptions = {
        mode: "onChange",
        disabled: !changeProfile,
        keepDirty: false
    }



    if (isLoading) return <p />;


    const submit = async (values: ProfileFormValues) => {
        console.log(values)

        try {
            updateMe.mutate(values); // <-- key fix
            setChangeProfile(false);
            // optional: ensure form values reflect the latest:
            // form.reset(values, { keepDirty: false });
        } catch (e) {
            console.log(e)
        }
    };



    return (

        <Form
            className='flex flex-col h-full space-y-5'
            onSubmit={submit}
            resetOnSubmit
            defaultValues={defaultValues}
            schema={profileSchema}
            resetOn={[user, courses, changeProfile]}
            {...formOptions}
        >
            <div className="flex gap-5">
                <FormInput
                    name="firstName"
                    placeholder={!user?.firstName ? "First Name" : ""}
                    label="First Name"
                />
                <FormInput
                    name="lastName"
                    placeholder={!user?.lastName ? "Last Name" : ""}
                    label="Last Name"
                />
            </div>

            <div className='mt-5'>
                <SelectInput
                    name="course"
                    className='w-fit'
                    placeholder="Select Your Course"
                    label="Courses"
                    values={courses}
                />
            </div>
            <div className="mt-auto space-y-5">

                <Separator />
                <div className='flex justify-end gap-2'>
                    <Button
                        hidden={!changeProfile}
                        variant="outline"
                        type='button'
                        onClick={() => {
                            setChangeProfile(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        allowSubmitOn={changeProfile ? { isDirty: true } : undefined}
                        type={changeProfile ? "submit" : "button"}
                        onClick={() => {
                            if (!changeProfile) setChangeProfile(true); // toggle into edit mode
                        }}
                    >
                        {changeProfile ? "Save" : "Update"}
                    </SubmitButton>
                </div>
            </div>
        </Form>
    );
}
