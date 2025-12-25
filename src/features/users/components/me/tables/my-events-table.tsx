import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { CancelRsvpButton, FeedbackButton } from '@/features/events/components/buttons/users';
import { Button } from '@/components/primitives/button';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { formatDateAndTime, isTimeWithin } from '@/lib/utils';
import { useMyEvents } from '@/features/users/hooks/me/queries';
import { CheckInButton } from '@/features/events/components/buttons/users/check-in-button';
import { logger } from '@/lib/logger';
import type { Event } from '@/features/events/types/event';

export function MyEventsTable() {
    const { data, isLoading } = useMyEvents();


    return (
        <ScrollArea className=" max-h[400px] h-[400px] rounded-t-md ">

            <Table>
                <TableCaption>A list of your rsvp'd and attended events.</TableCaption>
                <TableHeader>
                    <TableRow className='hover:bg-inherit'>
                        <TableHead className="w-2/4">Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody isLoading={isLoading} cols={3}>
                    {Array.isArray(data) && data.map((er) => {
                        return (
                            <EventRow key={`rsvps-table-${er?.eventId}`} data={er} />
                        );
                    })}
                </TableBody>
            </Table>
        </ScrollArea>

    )
}


type Data = {
    data: { event: Event, eventId: number, checkedInAt?: string | null, status?: 'complete' | 'missing' | null }
}

const EventRow = ({ data }: Data) => {
    const { event } = data

    if (!event) return

    const { date, time } = formatDateAndTime(event?.startAt, null, true)
    const isPast = new Date() > new Date(event?.endAt)
    const isLive = isTimeWithin({ start: event?.startAt, end: event?.endAt, margin: 10 })


    let action: React.ReactNode;
    if (isPast) {
        if (data?.status === 'complete') {
            action = <Button disabled variant="disabled">Complete</Button>;
        }
        else if (data?.checkedInAt) {
            action = <FeedbackButton event={event} />;
        } else {
            action = <Button disabled variant="disabled">Past Event</Button>;
        }
    }
    else if (isLive && !data?.checkedInAt) {
        action = <CheckInButton event={event} />;
    }
    else if (isPast && data?.checkedInAt) {
        action = <FeedbackButton event={event} />;

    } else if (data?.checkedInAt) {
        action = <Button disabled variant="disabled">Checked In</Button>;

    } else {
        action = <CancelRsvpButton eventId={data.eventId} />;
    }

    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >
                <div className="max-w-[300px] truncate overflow-hidden text-ellipsis">   {event.title || 'no title'}</div>
            </TableCell>
            <TableCell>
                {`${date}  ${time}`}
            </TableCell>
            <TableCell>
                {action}
            </TableCell>
        </TableRow>
    )

}
