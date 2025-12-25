import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useAdminEvents } from '@/features/events/hooks/events/queries';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { useAppNavigation } from '@/hooks';
import type { EventWithStats } from '@/features/events/types/event';
import { logger } from '@/lib/logger';

export function EventsTable() {
    const { data, isLoading } = useAdminEvents()


    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table >
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6 w-[150px] font-nunit">Event Name</TableHead>
                        <TableHead className='font-nunit'># RSVPS</TableHead>
                        <TableHead className='font-nunit'># Attended</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="" isLoading={isLoading} cols={4}>

                    {Array.isArray(data) && data.map((e) => {
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
        <TableRow className=" bg-background cursor-pointer" onClick={() => toEvent(event.id)}>
            <TableCell className="first:pl-6 ">{event.title || 'Null'}</TableCell>
            <TableCell className='text-right'>{event.rsvps || 0}</TableCell>
            <TableCell className='text-right'>{event.attended || 0}</TableCell>
        </TableRow>
    )
}

