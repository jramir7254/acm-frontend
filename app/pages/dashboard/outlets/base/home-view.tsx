import { MyEventsTable } from '@/features/users/components/me/tables/my-events-table';
import { AttendanceNumber, PointsNumber } from '@/features/users/components/me/numbers';
import { useSemsterSelect } from '@/features/app/components/use-semester-select';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"



export default function HomeView() {

    const { value, onChange, setValue } = useSemsterSelect()



    return (
        <div className='size-full relative max-h-screen flex flex-col space-y-5 ' >

            <div className='flex gap-5 flex-col md:flex-row  '>

                <Card size='sm' className='w-full max-w-2xs bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-linear-to-r from-blue-600 to-blue-800 '>
                    <CardHeader>
                        <CardTitle>Points</CardTitle>
                        <CardAction>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge>
                                        <Info />
                                    </Badge>

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>No idea what to use these for so please give suggestions lol.</p>
                                </TooltipContent>
                            </Tooltip>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <PointsNumber />

                    </CardContent>
                </Card>
                <Card size='sm' className='w-full max-w-2xs bg-linear-to-r from-indigo-500 to-indigo-700'>
                    <CardHeader>
                        <CardTitle>Events Attended</CardTitle>
                        <CardAction className=''>
                            <Badge variant={'default'}>
                                <AttendanceNumber type='missing' /> Pending
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <AttendanceNumber type='complete' />


                    </CardContent>
                </Card>



            </div>




            <div className='  overflow-hidden'>
                <div className='size-full space-y-5'>
                    <div className='inline-flex items-center gap-5'>
                        <h2 className='font-nunit text-xl font-bold'>My events</h2>
                    </div>
                    <MyEventsTable semesterId={value} />
                </div>
            </div>
        </div>
    )
}


