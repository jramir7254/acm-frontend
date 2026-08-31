import { AttendanceNumber, PointsNumber } from '@/features/users/components/ui';
import { useSemsterSelect } from '@/features/app/components/use-semester-select';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserAttendance, useUserRsvps } from '@/features/users/hooks/queries';
import { UserRsvpsTable } from '@/features/users/components/tables/rsvps-table';
import { UserAttendanceTable } from '@/features/users/components/tables/attendance-table';
import { AnimatedNumber } from '@/components/other/animated-number';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';



export default function HomeView() {
    // const { data: test, isLoading } = useUserRsvps("me");
    const { data, isRefetching, isLoading } = useUserAttendance("me")

    const pendingEvents = data?.filter(event => event.complete === 0).length || 0
    const countedEvents = data?.filter(event => event.complete === 1).length || 0

    return (
        <div className='max-w-svw flex flex-col space-y-5 ' >

            <header className='flex gap-5 flex-col md:flex-row  '>

                <Card size='sm' className='w-full md:max-w-2xs bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-linear-to-r from-blue-600 to-blue-800 '>
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
                <Card size='sm' className='w-full md:max-w-2xs bg-linear-to-r from-indigo-500 to-indigo-700'>
                    <CardHeader>
                        <CardTitle>Events Attended</CardTitle>
                        <CardAction className=''>
                            <Badge variant={'default'}>
                                <AnimatedNumber
                                    num={pendingEvents}
                                    className='text-base'
                                />
                                Pending
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <AnimatedNumber
                            num={countedEvents}
                            className='text-xl md:text-3xl'
                        />
                    </CardContent>
                </Card>
            </header>




            <div className=''>
                <div className=' space-y-5'>
                    <div className='inline-flex items-center gap-5'>
                        <h2 className='font-nunit text-xl font-bold'>My events</h2>
                    </div>
                    <Tabs defaultValue="rsvps" className="">
                        <TabsList variant={'line'}>
                            <TabsTrigger value="rsvps">RSVPS</TabsTrigger>
                            <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="rsvps">
                            <UserRsvpsTable />
                        </TabsContent>
                        <TabsContent value="attendance" className=''>
                            <ScrollArea className=" h-100 max-w-100 md:max-w-full">
                                <UserAttendanceTable />
                                <ScrollBar orientation='horizontal' />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}


