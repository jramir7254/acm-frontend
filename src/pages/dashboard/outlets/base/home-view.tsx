import { Separator } from '@/components/primitives/separator';
import { MyEventsTable } from '@/features/users/components/me/tables/my-events-table';
import { AttendanceNumber, PointsNumber } from '@/features/users/components/me/numbers';
import Gradient from '@/components/layout/gradient';
import { Centered, UnderConstructionCard } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import { InfoIcon } from 'lucide-react'
import { ScrollArea } from '@/components/primitives/scroll-area';
import { Select, SelectTrigger, SelectValue } from '@/components/primitives/select';
import { SemesterSelect } from '@/features/app/components/semester-select';
import { useSemsterSelect } from '@/features/app/components/use-semester-select';





export default function HomeView() {

    const { value, onChange, setValue } = useSemsterSelect()



    return (
        <div className='size-full grid gap-5 grid-cols-1 xl:grid-cols-6 xl:grid-rows-5 ' >

            <Gradient via="rgba(80,80,80,0.20)" className='flex rounded-md p-6 col-span-1 md:col-span-6 row-span-1 border-2 border-accent'>
                <Centered className='w-[30%] md:w-[15%]'>
                    <h3>Points</h3>
                    <PointsNumber />
                </Centered>

                <Separator orientation='vertical' />

                <Centered className='w-[40%] md:w-[15%]'>
                    <h3>Events Attended</h3>
                    <AttendanceNumber type='complete' />
                </Centered>

                <Centered className='w-[30%] md:w-[15%] text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                        <h3 className=''>Pending </h3>
                        <span title='Complete feedback forms to account for full attendance' className='mt-0.5 cursor-pointer'><InfoIcon size={15} /></span>
                    </div>
                    <AttendanceNumber type='missing' />
                </Centered>
            </Gradient>

            <div className='hidden lg:block col-span-2 row-span-4 bg-accent rounded-[12px] border-8'>
                <UnderConstructionCard className="size-full" />
            </div>


            <div className='rounded-md col-span-1 md:col-span-4 row-span-4  border-2 border-accent overflow-hidden'>
                <Gradient via="rgba(50,50,50,0.20)" className='size-full p-5'>
                    <div className='inline-flex items-center gap-2'>
                        <h2 className='font-monts text-lg'>My events</h2>
                        <Select value={String(value)} onValueChange={onChange} >
                            <SelectTrigger id='type' className="max-w-fit p-0! border-none bg-inherit! hover:underline hover:bg-none! font-nunit">
                                <SelectValue placeholder="Select A Semester" />
                            </SelectTrigger>
                            <SemesterSelect />
                        </Select>
                    </div>
                    <MyEventsTable semesterId={value} />
                </Gradient>
            </div>
        </div>
    )
}


