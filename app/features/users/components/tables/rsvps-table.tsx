import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CancelRsvpButton, FeedbackButton } from '@/features/events/components/buttons/users';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDateAndTime, isTimeWithin } from '@/lib/utils';
// import { _useMyEvents } from '@/features/users/hooks/me/queries';
import { CheckInButton } from '@/features/events/components/buttons/users/check-in-button';
import { logger } from '@/lib/logger';
import type { Event } from '@/features/events/types';
import type { UserEvent } from '@/features/users/types';

import { useUserRsvps } from '../../hooks/queries';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckIcon, Edit, Eye, MoreHorizontal, MoreVertical, TrashIcon } from 'lucide-react';
import { Link } from 'react-router';

export function UserRsvpsTable({ semesterId }: { semesterId?: string | undefined }) {
    const { data: test, isLoading } = useUserRsvps("me");


    return (
        <ScrollArea className=" max-h[400px] h-[400px] rounded-t-md relative">

            <Table className=''>
                <TableCaption>A list of your RSVPS.</TableCaption>
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className='hover:bg-inherit'>
                        <TableHead className="">Title</TableHead>
                        <TableHead className=''>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(test) && test.map((er) => {
                        return (
                            <EventRow key={`rsvps-table-${er?.eventId}`} data={er} />
                        );
                    })}
                </TableBody>
            </Table>
        </ScrollArea>

    )
}




//  TODO
//  clean this mess up
const EventRow = ({ data }: { data: UserEvent }) => {

    if (!data) return

    const { date, time } = formatDateAndTime(data?.startAt, null, true)
    const isPast = new Date() > new Date(data?.endAt)
    const isLive = isTimeWithin({ start: data?.startAt, end: data?.endAt, margin: 10 })



    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >
                <div className="max-w-[200px] md:max-w-[300px] truncate overflow-hidden text-ellipsis">   {data.title || 'no title'}</div>
            </TableCell>
            <TableCell className='hidden md:block'>
                {`${date}  ${time}`}
            </TableCell>

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* ✅ No SheetTrigger here — just a plain item */}
                        <DropdownMenuItem
                            disabled={!isLive || isPast}
                            onSelect={(e) => {
                                e.preventDefault()
                                // setSelectedCourse(c)
                                // setEditOpen(true)
                            }}
                        >
                            <CheckIcon />
                            Check In
                        </DropdownMenuItem>

                        <DropdownMenuItem
                        // onSelect={(e) => {
                        //     e.preventDefault()
                        //     setSelectedCourse(c)
                        //     setEditOpen(true)
                        // }}
                        >
                            <Eye />
                            View
                        </DropdownMenuItem>


                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            onSelect={(e) => {
                                e.preventDefault()       // ← stop dropdown from unmounting
                                // setSelectedCourseId(c.id)
                                // setDeleteOpen(true)
                            }}
                        >
                            <TrashIcon />
                            Cancel
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )

}
