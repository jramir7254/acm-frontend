import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useStats } from '../../../../../hooks/use-admin';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { useAppNavigation } from '@/hooks';
export function EventsTable() {
    const { data: s, isLoading, isFetching } = useStats()

    if (isLoading || isFetching) return <p>loading...</p>

    const { stats } = s

    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">

                        <TableHead className="first:pl-6 w-[150px]">Event ID</TableHead>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Number RSVPS</TableHead>
                        <TableHead>Number Attended</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {stats && stats.map(u => (
                        <EventProvider eventId={u.eventId}>
                            <EventRow s={u} key={`event-table-${u.eventId}`} />
                        </EventProvider>

                    ))}
                </TableBody>
            </Table>
        </ScrollArea>

    )
}

const EventRow = ({ s }) => {
    const e = useEventContext()
    const { toEvent } = useAppNavigation()
    return (
        <TableRow className=" bg-background cursor-pointer" onClick={() => toEvent(s?.eventId)}>
            <TableCell className="first:pl-6 ">{s?.eventId || 'Null'}</TableCell>
            <TableCell>{e?.title}</TableCell>
            <TableCell>{s?.rsvps || 0}</TableCell>
            <TableCell >{s?.attended || 0}</TableCell>

        </TableRow>
    )
}

