
import { useMe } from '@/features/users/hooks/me/queries';
import { Separator } from '@/components/ui/separator';
import InputDisplay from '@/components/other/input-display';
import ProfileForm from '@/features/users/components/user/forms/update-form/form';
import { useUpdateMe } from '@/features/users/hooks/me/mutations';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MeCard } from '@/features/users/components/me/cards/me-card';
import { PointsNumber } from '@/features/users/components/me/numbers';

export default function ProfileSettings() {
    const { data: user, isLoading } = useMe();
    const { mutateAsync } = useUpdateMe()

    if (!user) return null


    if (isLoading) return <p />;

    const accountComplete = Boolean(user?.accountComplete);




    return (
        <ScrollArea className="size-full h-[85vh] grid grid-cols-1 ">
            <div className="space-y-4 flex flex-col">
                <div>
                    <h2 hidden={accountComplete} className='font-bold text-xl mb-2'>
                        Finish setting up your profile to earn 20 points!
                    </h2>
                </div>
                <div className="border bg-card flex flex-col gap-5  p-5 rounded-xl  ">
                    <div className='flex gap-3'>

                        <MeCard />

                        <Separator orientation='vertical' className='min-h-10' />
                        <div className='flex items-center gap-2'>
                            <PointsNumber />
                            <p>Points</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row space-y-2 gap-5'>
                        <InputDisplay name='epccId' label='EPCC ID' value={user?.epccId} />
                        <InputDisplay name='email' label='EPCC Email' value={user?.epccEmail} />
                    </div>

                </div>


                <div className=' border bg-card flex flex-col gap-5  p-5 rounded-xl ' >
                    <ProfileForm user={user} handleSubmit={mutateAsync} />
                </div>
            </div>


        </ScrollArea>
    );
}
