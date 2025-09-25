import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useStats } from '../../hooks/use-admin';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';

export function EventsTable() {
    const { data: s, isLoading, isFetching } = useStats()

    if (isLoading || isFetching) return <p>loading...</p>

    const { stats } = s || []

    return (
        <Table>
            <TableCaption>A list of your rsvp'd events.</TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-inherit'>
                    <TableHead>EPCC ID</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Number RSVPS</TableHead>
                    <TableHead>Number Attended</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {stats && stats.map(u => (
                    <EventProvider eventId={u.eventId}>
                        <EventRow s={u} />
                    </EventProvider>

                ))}
            </TableBody>
        </Table>
    )
}

const EventRow = ({ s }) => {
    const e = useEventContext()
    return (
        <TableRow >
            <TableCell>{s?.eventId || 'Null'}</TableCell>
            <TableCell>{e?.title}</TableCell>
            <TableCell >{s?.attended || 'Null'}</TableCell>
            <TableCell>{s?.rsvps || 'Null'}</TableCell>

        </TableRow>
    )
}
