import React, { useEffect, useState } from 'react'
import { Input } from '@/components/primitives/input'
import { useMe, useUpdateMe } from '@/features/auth/hooks/use-me'
import { Form, FormInput, MultiSelect } from '@/components/input';
import Gradient from '@/components/layout/gradient';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Separator } from '@/components/primitives/separator';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProfileFormValues, profileSchema } from '../../types/profile-schema';
import { Button } from '@/components/primitives/button';
import { Label } from '@/components/primitives/label';
import { Info, InfoIcon } from 'lucide-react';
import { Points, Attendance } from '../../components/ui';
import { UnderConstruction, Tape, UnderConstructionCard } from '@/components/layout';
import { PublicApi } from '@/services/api/public';
import { SelectInput } from '@/components/input/select';
export default function ProfileSettings() {
    const { data: user, isLoading } = useMe();
    const updateMe = useUpdateMe()
    const [changeProfile, setChangeProfile] = useState(false);
    const [courses, setCourses] = useState([])

    const form = useForm({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
        disabled: !changeProfile
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await PublicApi.get('/courses')
                const { courses } = data
                console.log(data)
                setCourses(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    // when user data arrives (or changes), hydrate the form
    useEffect(() => {
        if (user) {
            form.reset({
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                course: user.course ?? "" // or user.course ?? ""
            }, { keepDirty: false }); // reset dirtiness since these are the source-of-truth values
        }
    }, [user, form]);

    if (isLoading) return <p />;

    const accountComplete = Boolean(user?.accountComplete);

    // handy helper to reuse for cancel/reset-to-user
    const resetToUser = () =>
        form.reset({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            course: user.course ?? "" // or user.course ?? ""
        });

    const submit = async (values: ProfileFormValues) => {
        console.log(values)
        return
        try {
            updateMe.mutate(values); // <-- key fix
            setChangeProfile(false);
            // optional: ensure form values reflect the latest:
            form.reset(values, { keepDirty: false });
        } catch (e) {
            console.log(e)
        }
    };



    return (
        <Gradient via="rgba(50,50,50,0.20)" className="m-10 p-10 w-full grid grid-cols-2">
            <div className="space-y-4 flex flex-col screen">
                <div>
                    {!accountComplete && <h2>Finish setting up your profile to earn 5 points!</h2>}
                    <Gradient via="rgba(50,50,50,0.20)" className="border border-white/20 p-5 flex">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Points />
                    </Gradient>
                </div>

                <Separator />

                <div className='space-y-2 '>
                    <Label htmlFor="epccId" className='flex items-center'>
                        EPCC ID <span title="asd"><InfoIcon className='cursor-pointer' size={15} /></span>
                    </Label>
                    <Input id="epccId" disabled defaultValue={user?.epccId} className="w-fit" />
                </div>
                <Separator />


                <div>

                    <Form {...form}>
                        <form id='profile-form' onSubmit={form.handleSubmit(submit)}>
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


                            <FormInput name="course" label="Course" disabled={!changeProfile}>
                                {(field) => (
                                    <SelectInput
                                        className='w-fit'
                                        placeholder="Select Your Course"
                                        label="Courses"
                                        values={courses}
                                        field={field}
                                    />
                                )}
                            </FormInput>
                        </form>
                    </Form>
                </div>

                <div className="mt-auto space-y-5">
                    <Separator />
                    <div className='flex justify-end gap-2'>
                        <Button
                            hidden={!changeProfile}
                            variant="outline"
                            onClick={() => {
                                setChangeProfile(false);
                                resetToUser(); // ← reset to current user values, not empty defaults
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            form="profile-form"
                            type={changeProfile ? 'submit' : 'button'}
                            disabled={changeProfile && !form.formState.isDirty}
                            onClick={() => {
                                if (!changeProfile) setChangeProfile(true); // only toggle, don't submit
                            }}
                        >
                            {changeProfile ? 'Save' : 'Update'}
                        </Button>
                    </div>
                </div>
            </div>
            {/* <Separator orientation='vertical' /> */}
            <UnderConstructionCard className='mx-10 bg-accent rounded-[12px] border-8' text=''>
            </UnderConstructionCard>


        </Gradient>
    );
}
