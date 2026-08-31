import { EventsNumber, EventsTable } from '@/features/events/components/data/';
import { useEventsReportExcel, useEventsReportPdf } from '@/features/admin/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { EventsNumberCard } from '@/features/events/components/cards/num-events-card';
import { RatedEventsCard } from '@/features/events/components/cards/rated-events-card';
import { AttendanceBarChart } from '@/features/events/components/data/barchart';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Heading } from '@/components/text/typography';
import { Card, CardAction, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SemesterSelect } from '@/features/app/components/semester-select';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useSemsterSelect } from '@/features/app/components/use-semester-select';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { useStats } from '@/features/events/hooks/queries';
import { EventFormSheet } from '@/features/events/components/overlays/event-form-sheet';
import { Plus } from 'lucide-react';


export default function EventsView() {
    const { mutate: excel } = useEventsReportExcel()
    const { mutate: pdf } = useEventsReportPdf()
    const [searchParams, setSearchParams] = useSearchParams({ semester: 'current' });
    const { data } = useStats({ semesterId: searchParams.get('semester') ?? 'current' })


    const oc = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        // Set the new parameter value
        newParams.set('semester', value);
        setSearchParams(newParams)
    }


    return (
        <div className='flex flex-col gap-5'>

            {/* <div className='flex  w-full'>
                <EventFormSheet>
                    <Button className='w-fit flex-end'>
                        <Plus />
                        Create Event
                    </Button>
                </EventFormSheet>
            </div> */}

            <header className='flex flex-col md:flex-row gap-20'>
                <div>
                    <h4>Total Events</h4>
                    <div>
                        <p className='text-2xl font-semibold tabular-nums'>
                            {Number(data?.totalEvents)}
                        </p>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                        {Number(data?.numSemEvents)} events this semester
                    </p>
                </div>
                <div>
                    <h4>Highest Rated Event</h4>
                    <div>
                        <p className='text-2xl font-semibold tabular-nums'>
                            {data?.highestRated?.avgRating ? Number(data?.highestRated?.avgRating).toFixed(2) : <span className='text-muted-foreground'>X</span>} / 5
                        </p>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                        {data?.highestRated?.title || <span className='text-muted-foreground'>No data available</span>}
                    </p>
                </div>
                <div>

                    <h4>Lowest Rated Event</h4>

                    <div>
                        <p className='text-2xl font-semibold tabular-nums'>
                            {data?.lowestRated?.avgRating ? Number(data?.lowestRated?.avgRating).toFixed(2) : <span className='text-muted-foreground'>X</span>} / 5
                        </p>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                        {data?.lowestRated?.title || <span className='text-muted-foreground'>No data available</span>}
                    </p>

                </div>
                <div className="flex-1 min-w-0">
                    <div className='flex justify-between'>
                        <h4>Attendance this semester</h4>

                        <div className='flex gap-2'>

                            <Select onValueChange={oc} value={searchParams.get('semester') ?? 'current'}>
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SemesterSelect></SemesterSelect>

                                    </SelectGroup>
                                </SelectContent>

                            </Select>

                            <EventFormSheet>
                                <Button className='w-fit '>
                                    <Plus />
                                    Create Event
                                </Button>
                            </EventFormSheet>
                        </div>
                    </div>
                    {/* <div> */}
                    <AttendanceBarChart semesterId={searchParams.get('semester') ?? 'current'} />
                    {/* </div> */}
                </div>
            </header>




            <ScrollArea className="h-100 max-w-100 md:max-w-full">
                <EventsTable semesterId={searchParams.get('semester') ?? 'current'} />

                <ScrollBar orientation='horizontal' />
            </ScrollArea>
        </div >
    )
}
