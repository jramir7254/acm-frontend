import { Centered, Container as Grid } from '@/components/layout';
import { EventsNumber, EventsTable } from '@/features/events/components/data/';



import { useEventsReportExcel, useEventsReportPdf } from '@/features/admin/hooks/use-admin';
import { Button } from '@/components/primitives/button';
import { logger } from '@/lib/logger';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import { useStats } from '@/features/events/hooks/events/queries';
import { EventsNumberCard } from '@/features/events/components/cards/num-events-card';
import { RatedEventsCard } from '@/features/events/components/cards/rated-events-card';
import { BChart } from '@/features/events/components/data/barchart';

export default function EventsView() {
    const { mutate: excel } = useEventsReportExcel()
    const { mutate: pdf } = useEventsReportPdf()

    return (
        <div className='size-full flex flex-col gap-5'>

            <header>
                <h2>Events</h2>
            </header>

            <div className='flex gap-5'>
                <EventsNumberCard />
                <BChart />
            </div>


            <div className=' flex '>
                <div>
                    <EventsTable />
                </div>
                <div className=' '>
                    <RatedEventsCard />
                    <RatedEventsCard />
                </div>
                <aside className='ml-auto bg-card border'>
                    <div className='space-x-3 ml-auto'>
                        <Button variant={'default'} size={'icon'} onClick={() => excel()}>
                            <FaFileExcel />
                        </Button>
                        <Button variant={'default'} size={'icon'} onClick={() => pdf()}>
                            <FaFilePdf />
                        </Button>
                    </div>
                </aside>
            </div>
        </div >
    )
}
