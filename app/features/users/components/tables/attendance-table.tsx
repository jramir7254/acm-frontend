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

import { useUserAttendance, useUserRsvps } from '../../hooks/queries';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckIcon, Edit, Eye, EyeClosed, MoreHorizontal, MoreVertical, TrashIcon } from 'lucide-react';
import { Link } from 'react-router';
import { FeedbackFormOverlay } from '@/features/events/components/forms/feedback-form/form-overlay';
import { CustomBadge } from '@/components/other/custom-badge';

export function UserAttendanceTable({ semesterId }: { semesterId?: string | undefined }) {
    const { data, isLoading } = useUserAttendance("me");


    return (

        <Table className=''>
            <TableCaption>A list of your attended events.</TableCaption>
            <TableHeader className="sticky top-0 bg-accent rounded-2xl  z-5 ">
                <TableRow>
                    <TableHead className="first:pl-6 whitespace-nowrap">Title</TableHead>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="whitespace-nowrap">Feedback</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(data) && data.map((event) => {
                    const { date, time } = formatDateAndTime(event.checkedInAt, null, true)

                    return (
                        <TableRow className='' key={`user-attendance-table-${event.eventId}`}>
                            <TableCell className=" first:pl-6 ">
                                <div className="max-w-[200px] truncate">{event.title || 'no title'}</div>

                            </TableCell>
                            <TableCell className=''>
                                {date}
                                <br />
                                <p className='text-muted-foreground'>

                                    {time}
                                </p>
                            </TableCell>
                            <TableCell className=''>
                                <CustomBadge config={{
                                    0: {
                                        color: 'red'
                                    },
                                    1: {
                                        color: 'green',
                                        variant: 'secondary'
                                    }
                                }}
                                    itemKey={event.complete ? '1' : '0'} >
                                    {event.complete ? "Complete" : 'Missing'}
                                </CustomBadge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-fit' align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        {/* ✅ No SheetTrigger here — just a plain item */}



                                        <DropdownMenuItem
                                            // disabled={!isLive || isPast}
                                            asChild
                                            variant='default'
                                            onSelect={(e) => {
                                                e.preventDefault()
                                                // setSelectedCourse(c)
                                                // setEditOpen(true)
                                            }}
                                        >
                                            {event.complete ?
                                                <FeedbackFormOverlay event={event} surveyId={event?.surveyId}>
                                                    <Button variant='secondary' >
                                                        <EyeClosed />
                                                        Feedback
                                                    </Button >
                                                </FeedbackFormOverlay>

                                                :
                                                <FeedbackFormOverlay event={event}>
                                                    <Button variant='default' >
                                                        <CheckIcon />
                                                        Feedback
                                                    </Button >
                                                </FeedbackFormOverlay>
                                            }



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


                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}

