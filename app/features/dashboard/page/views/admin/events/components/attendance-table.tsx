import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useStats } from '../../../../../hooks/use-admin';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { useAppNavigation } from '@/hooks';


export function AttendanceTable({ eventAttendance }) {

    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">

                        <TableHead className="first:pl-6 w-[150px]">EPCC ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {eventAttendance && eventAttendance.map(u => (
                        <TableRow className=" bg-background cursor-pointer" >
                            <TableCell className="first:pl-6 ">{u?.epccId || 'Null'}</TableCell>
                            <TableCell>{u?.firstName}</TableCell>
                            <TableCell>{u?.lastName || 0}</TableCell>
                            <TableCell >{new Date(u?.checkedInAt).toLocaleDateString() || 0}</TableCell>

                        </TableRow>

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

