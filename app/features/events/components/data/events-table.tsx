import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { useAdminEvents } from '@/features/events/hooks/events/queries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppNavigation } from '@/hooks';
import type { EventWithStats } from '@/features/events/types';
import { logger } from '@/lib/logger';
import { Link } from 'react-router';

export function EventsTable({ semesterId = 'current' }) {
    const { data, isLoading } = useAdminEvents(semesterId)


    return (
        <ScrollArea className=" max-h[400px] h-[400px] rounded-t-md w-full ">

            <Table >
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6  font-nunit ">Title</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="" >

                    {data && data?.eventsData?.map((e) =>
                        <TableRow className="  cursor-pointer">
                            <Link to={String(e.id)} className='w-full'>
                                <TableCell className="first:pl-6 w-full ">{e.title || 'Null'}</TableCell>
                            </Link>
                        </TableRow>
                    )}
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
        </TableRow>
    )
}

