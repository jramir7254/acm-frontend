import React from 'react'
import { NumberCard } from '@/features/dashboard/components/data'
import { Centered, UnderConstructionCard, Container as Grid } from '@/components/layout';
import { EventsNumber, EventsTable } from './components';

import GridItem from '@/features/dashboard/components/layout/grid-item';

import Gradient from '@/components/layout/gradient'
import { ScrollArea } from '@/components/primitives/scroll-area'


export default function EventsView() {

    const grid = {
        mobile: 'w-screen h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-5 grid-rows-4'
    }

    return (
        <Grid classNameLarge={grid.default} classNameMac={grid.default} classNameMobile={grid.mobile}>
            <Centered className='flex rounded-t-md rounded-b-none md:rounded-md p-6 col-span-1 md:col-span-1 row-span-1 border-2 bg-accent'>
                <h3>Number of Events</h3>
                <EventsNumber />
            </Centered>

            <Gradient className=' col-span-5 row-span-4 overflow-hidden '>
                <EventsTable />
            </Gradient>
        </Grid>
    )
}
