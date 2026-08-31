
import { Separator } from '@/components/ui/separator';
import InputDisplay from '@/components/other/input-display';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MeCard } from '@/features/users/components/ui/me-card';
import { PointsNumber } from '@/features/users/components/ui';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Marker, MarkerContent } from '@/components/ui/marker';
import { useBaseUser, useUserCourses } from '@/features/users/hooks/queries';
import NamesForm from '@/features/users/components/forms/names-form';
import { useUpdateUser, useUpdateUserCourses } from '@/features/users/hooks/mutations';
import UserCoursesForm from '@/features/users/components/forms/courses-form';


export default function ProfileSettings() {
    const { data: user, isLoading } = useBaseUser("me");
    const { data: courses } = useUserCourses("me");
    const { mutateAsync } = useUpdateUser("me")
    const updateCourses = useUpdateUserCourses("me")

    if (!user) return null

    if (isLoading) return <p />;

    return (
        <ScrollArea className="size-full h-[85vh] grid grid-cols-1 ">
            <div className="space-y-4 flex flex-col">
                <div className="  flex flex-col gap-5  p-5 rounded-xl  ">
                    {/* <div className='flex gap-3'>
                        <MeCard />

                        <Separator orientation='vertical' className='min-h-10' />

                        <div className='flex items-center gap-2'>
                            <PointsNumber />
                            <p>Points</p>
                        </div>
                    </div> */}

                    <div className='flex flex-col md:flex-row space-y-2 gap-5'>
                        <InputDisplay name='epccId' label='EPCC ID' value={user?.epccId} />
                        <InputDisplay name='email' label='EPCC Email' value={user?.epccEmail} />
                    </div>
                </div>


                <div className='  flex flex-col gap-5  p-5 rounded-xl ' >
                    <NamesForm user={user} handleSubmit={mutateAsync} />
                </div>

                <Separator />

                <div className='  flex flex-col gap-5  p-5 rounded-xl ' >
                    <UserCoursesForm user={courses} handleSubmit={updateCourses.mutateAsync} />
                </div>
            </div>
        </ScrollArea>
    );
}
