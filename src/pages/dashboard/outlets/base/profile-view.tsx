import React, { useEffect, useState } from 'react'

import { useMe } from '@/features/users/hooks/me/queries';
import Gradient from '@/components/layout/gradient';
import { Separator } from '@/components/primitives/separator';
import InputDisplay from '@/components/ui/input-display';

import { Button } from '@/components/primitives/button';
import { MeCard } from '@/features/users/components/me/cards/me-card';

// import ProfileForm from '@/features/dashboard/components/forms/profile-form';
import ProfileForm from '@/features/users/components/user/forms/update-form/form';
import { UnderConstructionCard } from '@/components/layout';
import { useRole } from '@/features/auth/hooks/use-auth';
import { PointsNumber } from '@/features/users/components/me/numbers';
import { useUpdateMe } from '@/features/users/hooks/me/mutations';
import { ScrollArea } from '@/components/primitives/scroll-area';

export default function ProfileSettings() {
    const { data: user, isLoading } = useMe();
    const { mutateAsync } = useUpdateMe()

    if (!user) return null


    if (isLoading) return <p />;

    const accountComplete = Boolean(user?.accountComplete);




    return (
        <ScrollArea className=" p-10 size-full h-[85vh] grid grid-cols-1 ">
            <div className="space-y-4 flex flex-col">
                <div>
                    <h2 hidden={accountComplete} className='font-bold text-xl mb-2'>
                        Finish setting up your profile to earn 20 points!
                    </h2>
                    <div className="border  p-5 rounded-md  flex space-x-3">
                        <MeCard />

                        <Separator orientation='vertical' className='min-h-10' />
                        <div className='flex items-center gap-2'>
                            <PointsNumber />
                            <p>Points</p>
                        </div>

                    </div>
                </div>

                <Separator />

                <div className='flex flex-col md:flex-row space-y-2 gap-5'>
                    <InputDisplay name='epccId' label='EPCC ID' value={user?.epccId} />
                    <InputDisplay name='email' label='EPCC Email' value={user?.epccEmail} />
                </div>

                <Separator />

                <div className='h-screen flex flex-col ' >

                    <ProfileForm user={user} handleSubmit={mutateAsync} />

                </div>
            </div>

            {/* <div className='hidden lg:block mx-10 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className='size-full' />
            </div> */}
        </ScrollArea>
    );
}
