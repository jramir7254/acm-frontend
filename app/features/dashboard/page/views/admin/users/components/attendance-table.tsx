import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { EventProvider, useEventContext } from '@/features/events/context/event-context'
import { CustomBadge, type BadgeConfig } from '@/components/ui/custom-badge'
import { formatDateAndTime } from '@/lib/utils'
export default function AttendanceTable({ attendance }: { attendance: Attendance[] }) {
    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6 w-[150px]">Title</TableHead>
                        <TableHead >Date</TableHead>
                        <TableHead >Checked In</TableHead>
                        <TableHead >Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="border">
                    {attendance.map((a) => (

                        <EventProvider key={`${a.eventId}-${"rsvp"}`} eventId={a.eventId}>
                            <EventRow attendance={a} />
                        </EventProvider>
                    ))}
                </TableBody>

                <TableCaption>A list of your rsvp&apos;d events.</TableCaption>
            </Table>
        </ScrollArea>
    )
}



const EventRow = ({ attendance }: { attendance: Attendance }) => {
    const e = useEventContext()

    const badgeConfig: BadgeConfig = {
        complete: { variant: 'outline', color: 'green' },
        missing: { variant: 'outline', color: 'red' },

    }

    const { date, time } = formatDateAndTime(e?.startAt, null, true)


    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >
                <div className="max-w-[300px] truncate overflow-hidden text-ellipsis">   {e.title}</div>
            </TableCell>
            <TableCell>
                {`${date}  ${time}`}
            </TableCell>
            <TableCell>
                {attendance.checkedInAt}
            </TableCell>
            <TableCell>
                <CustomBadge config={badgeConfig} itemKey={attendance.status} />
            </TableCell>
        </TableRow>
    )
}