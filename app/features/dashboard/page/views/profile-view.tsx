import React, { useEffect, useState } from 'react'

import { useMe } from '@/features/auth/hooks/use-me'
import Gradient from '@/components/layout/gradient';
import { Separator } from '@/components/primitives/separator';
import InputDisplay from '@/components/ui/input-display';

import { Button } from '@/components/primitives/button';
import GridItem from '../../components/layout/grid-item';
import { Points, UserCard } from '../../components/data';
import { UnderConstructionCard } from '@/components/layout';
import ProfileForm from '../../components/forms/profile-form';


export default function ProfileSettings() {
    const { data: user, isLoading } = useMe();

    if (!user) return null


    if (isLoading) return <p />;

    const accountComplete = Boolean(user?.accountComplete);




    return (
        <Gradient via="rgba(50,50,50,0.20)" className="m-2 md:m-10 p-10 w-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
            <GridItem className="space-y-4 flex flex-col">
                <div>
                    <h2 hidden={accountComplete} className='font-bold text-xl mb-2'>
                        Finish setting up your profile to earn 20 points!
                    </h2>
                    <Gradient via="rgba(50,50,50,0.20)" className="border border-white/20 p-5 rounded-md  flex space-x-3">
                        <UserCard />
                        <Separator orientation='vertical' className='min-h-10' />
                        <div className='flex items-center gap-2'>
                            <Points />
                            <p>Points</p>
                        </div>
                    </Gradient>
                </div>

                <Separator />

                <div className='flex flex-col md:flex-row space-y-2 gap-5'>
                    <InputDisplay name='epccId' label='EPCC ID' value={user?.epccId} />
                    <InputDisplay name='email' label='EPCC Email' value={user?.epccEmail} />
                </div>

                <Separator />

                <div className='h-full'>
                    <ProfileForm />
                </div>
            </GridItem>

            <GridItem hideInMobile className='mx-10 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className='size-full' />
            </GridItem>
        </Gradient>
    );
}
