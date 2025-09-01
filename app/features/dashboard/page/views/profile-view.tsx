import React, { useEffect, useState } from 'react'
import { useMe, useUpdateMe } from '@/features/auth/hooks/use-me'
import { Form, FormInput, SelectInput } from '@/components/input';
import Gradient from '@/components/layout/gradient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Separator } from '@/components/primitives/separator';
import InputDisplay from '@/components/ui/input-display';

import { type ProfileFormValues, profileSchema } from '../../types/profile-schema';
import { Button } from '@/components/primitives/button';
import GridItem from '../../components/layout/grid-item';
import { Points, Attendance } from '../../components/data';
import { UnderConstruction, Tape, UnderConstructionCard } from '@/components/layout';
import { PUBLIC_API } from '@/services/api';
export default function ProfileSettings() {
    const { data: user, isLoading } = useMe();
    const updateMe = useUpdateMe()
    const [changeProfile, setChangeProfile] = useState(false);
    const [courses, setCourses] = useState([])

    if (!user) return null

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

    useEffect(() => {
        (async () => {
            try {
                const { data } = await PUBLIC_API.get('/courses')
                const { courses } = data
                setCourses(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])


    if (isLoading) return <p />;

    const accountComplete = Boolean(user?.accountComplete);

    const submit = async (values: ProfileFormValues) => {
        console.log(values)
        return
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
        <Gradient via="rgba(50,50,50,0.20)" className="m-10 p-10 w-full grid grid-cols-2 border-2 border-accent">
            <div className="space-y-4 flex flex-col screen">
                <div>
                    {!accountComplete && <h2 className='font-bold text-xl mb-2'>Finish setting up your profile to earn 5 points!</h2>}
                    <Gradient via="rgba(50,50,50,0.20)" className="border border-white/20 p-5 flex">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Points />
                    </Gradient>
                </div>

                <Separator />

                <div className='flex space-y-2 gap-5'>
                    <InputDisplay name='epccId' label='EPCC ID' value={user?.epccId} />
                    <InputDisplay name='email' label='EPCC Email' value={user?.email} />
                </div>
                <Separator />


                <div className='h-full'>

                    <Form
                        className='flex flex-col h-full space-y-5'
                        onSubmit={submit}
                        defaultValues={defaultValues}
                        schema={profileSchema}
                        resetOn={[user, courses]}
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
                                    onClick={() => {
                                        setChangeProfile(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    form="profile-form"
                                    type={changeProfile ? 'submit' : 'button'}
                                    disabled={changeProfile}
                                    onClick={() => {
                                        if (!changeProfile) setChangeProfile(true); // only toggle, don't submit
                                    }}
                                >
                                    {changeProfile ? 'Save' : 'Update'}
                                </Button>
                            </div>
                        </div>

                    </Form>
                </div>
            </div>

            <GridItem hideInMobile className='mx-10 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className='size-full' />
            </GridItem>


        </Gradient>
    );
}
