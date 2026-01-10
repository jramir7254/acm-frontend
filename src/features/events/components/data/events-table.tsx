import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useAdminEvents } from '@/features/events/hooks/events/queries';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { useAppNavigation } from '@/hooks';
import type { EventWithStats } from '@/features/events/types/event';
import { logger } from '@/lib/logger';

export function EventsTable({ semesterId = 'current' }) {
    const { data, isLoading } = useAdminEvents(semesterId)


    return (
        <ScrollArea className=" max-h[400px] h-[400px] rounded-t-md w-full bg-background">

            <Table >
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6  font-nunit ">Title</TableHead>
                        {/* <TableHead className='font-nunit'># RSVPS</TableHead>
                        <TableHead className='font-nunit'># Attended</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody className="" isLoading={isLoading} cols={1}>

                    {data && data?.eventsData?.map((e) => {
                        return (
                            <EventRow event={e} key={`event-table-${e.id}`} />
                        );
                    })}

                </TableBody>
            </Table>
        </ScrollArea>

    )
}

const EventRow = ({ event }: { event: EventWithStats }) => {
    const { toEvent } = useAppNavigation()

    return (
        <TableRow className="  cursor-pointer" onClick={() => toEvent(event.id)}>
            <TableCell className="first:pl-6 ">{event.title || 'Null'}</TableCell>
            {/* <TableCell className='text-right'>{event.rsvps || 0}</TableCell>
            <TableCell className='text-right'>{event.attended || 0}</TableCell> */}
        </TableRow>
    )
}

