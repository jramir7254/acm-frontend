import React, { useRef } from 'react'
import { NumberCard } from '@/features/dashboard/components/data'
import { Centered, UnderConstructionCard, Container as Grid } from '@/components/layout';
import { EventsNumber, EventsTable } from './components';



import Gradient from '@/components/layout/gradient'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { useEventsReportExcel, useEventsReportPdf } from '@/features/admin/hooks/use-admin';
import { Button } from '@/components/primitives/button';
import { logger } from '@/lib/logger';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';



export default function EventsView() {
    const { mutate: excel } = useEventsReportExcel()
    const { mutate: pdf } = useEventsReportPdf()


    const grid = {
        mobile: 'h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-5 grid-rows-4'
    }


    return (
        <Grid classNameLarge={grid.default} classNameMac={grid.default} classNameMobile={grid.mobile}>


            <Centered className='flex rounded-t-md rounded-b-none md:rounded-md p-6 col-span-1 md:col-span-1 row-span-1 border-2 bg-accent'>
                <h3>Number of Events</h3>
                <EventsNumber />
            </Centered>

            <div className='space-x-3 ml-auto'>

                <Button variant={'default'} size={'icon'} onClick={() => excel()}>
                    <FaFileExcel />
                </Button>

                <Button variant={'default'} size={'icon'} onClick={() => pdf()}>
                    <FaFilePdf />
                </Button>

            </div>



            <Gradient className=' col-span-5 row-span-4 overflow-hidden '>

                <EventsTable />

            </Gradient>
        </Grid >
    )
}
