import React, { useRef } from 'react'
import { NumberCard } from '@/features/dashboard/components/data'
import { Centered, UnderConstructionCard, Container as Grid } from '@/components/layout';
import { EventsNumber, EventsTable } from './components';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GridItem from '@/features/dashboard/components/layout/grid-item';
import html2pdf from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { useReactToPrint } from "react-to-print";


import Gradient from '@/components/layout/gradient'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { useEventsReport } from '@/features/admin/hooks/use-admin';
import { Button } from '@/components/primitives/button';
import { logger } from '@/lib/logger';



export default function EventsView() {
    const { mutate } = useEventsReport()


    const grid = {
        mobile: 'h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-5 grid-rows-4'
    }


    return (
        <Grid classNameLarge={grid.default} classNameMac={grid.default} classNameMobile={grid.mobile}>
            {/* <Button onClick={handlePrint}>Download</Button> */}

            {/* <div ref={contentRef}> */}

            <Centered className='flex rounded-t-md rounded-b-none md:rounded-md p-6 col-span-1 md:col-span-1 row-span-1 border-2 bg-accent'>
                <h3>Number of Events</h3>
                <EventsNumber />
                <Button onClick={() => mutate()}>Report</Button>
            </Centered>



            <Gradient className=' col-span-5 row-span-4 overflow-hidden '>

                <EventsTable />

            </Gradient>
            {/* </div> */}
        </Grid >
    )
}
