import { EventsNumber, EventsTable } from '@/features/events/components/data/';



import { useEventsReportExcel, useEventsReportPdf } from '@/features/admin/hooks/use-admin';
import { Button } from '@/components/primitives/button';
import { logger } from '@/lib/logger';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useStats } from '@/features/events/hooks/events/queries';
import { EventsNumberCard } from '@/features/events/components/cards/num-events-card';
import { RatedEventsCard } from '@/features/events/components/cards/rated-events-card';
import { BChart } from '@/features/events/components/data/barchart';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { Heading } from '@/components/text/typography';
import { Card, CardAction, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/primitives/card';
import { UnderConstructionCard } from '@/components/layout';
import { SemesterSelect } from '@/features/app/components/semester-select';
import { Select, SelectTrigger, SelectValue } from '@/components/primitives/select';
import { Separator } from '@/components/primitives/separator';
import { useSemsterSelect } from '@/features/app/components/use-semester-select';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';



export default function EventsView() {
    const { mutate: excel } = useEventsReportExcel()
    const { mutate: pdf } = useEventsReportPdf()
    const [searchParams, setSearchParams] = useSearchParams({ semester: 'current' });

    const oc = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        // Set the new parameter value
        newParams.set('semester', value);
        setSearchParams(newParams)
    }


    return (
        <div className='flex flex-col gap-5 p-5 size-full'>
            <header className='flex flex-col lg:flex-row gap-5'>
                <EventsNumberCard semesterId={searchParams.get('semester') ?? 'current'} />
                <BChart semesterId={searchParams.get('semester') ?? 'current'} />
            </header>




            <div className='flex gap-5 max-h-full '>
                <div className='flex flex-col gap-5'>
                    <RatedEventsCard semesterId={searchParams.get('semester') ?? 'current'} />
                    <div className='hidden lg:block col-span-2 row-span-4 bg-accent rounded-[12px] border-8 flex-1'>
                        <UnderConstructionCard className="size-full" />
                    </div>                </div>
                <Card className='w-full max-h-full'>
                    <CardHeader className=''>
                        <CardTitle>
                            <Heading>Events</Heading>
                        </CardTitle>
                        <CardAction>
                            <Select value={searchParams.get('semester') || 'current'} onValueChange={oc}>
                                <SelectTrigger id='type' className="max-w-fit p-0! border-none bg-inherit! hover:underline hover:bg-none! font-nunit">
                                    <SelectValue placeholder="Select A Semester" />
                                </SelectTrigger>
                                <SemesterSelect />
                            </Select>
                        </CardAction>

                    </CardHeader>
                    <Separator />

                    <CardContent className='lg:flex gap-5'>
                        <div className='w-2/3'>
                            {/* <Heading>Events</Heading> */}
                            <EventsTable semesterId={searchParams.get('semester') ?? 'current'} />
                        </div>
                        <Separator orientation='vertical' />
                        <aside className=''>
                            <div className='space-x-3 ml-auto'>
                                <Button variant={'default'} size={'icon'} onClick={() => excel()}>
                                    <FaFileExcel />
                                </Button>
                                <Button variant={'default'} size={'icon'} onClick={() => pdf()}>
                                    <FaFilePdf />
                                </Button>
                            </div>
                        </aside>
                    </CardContent>

                </Card>
            </div >
        </div >
    )
}
