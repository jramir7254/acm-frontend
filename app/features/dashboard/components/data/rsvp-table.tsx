import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { Skeleton } from '@/components/primitives/skeleton';
import { useUserRsvps } from '../../hooks/use-user';
import { CancelRsvpButton, CheckInButton, FeedbackButton } from '../../components/buttons'
import { Button } from '@/components/primitives/button';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';
import { formatDateAndTime } from '@/utils/format-date';

export function RsvpTable() {
    const { data: rsvps, isLoading: rsvpsLoading, isFetching } = useUserRsvps();



    return (
        <Table>
            <TableCaption>A list of your rsvp'd events.</TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-inherit'>
                    <TableHead className="w-2/4">Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rsvpsLoading && Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonRow key={i * 53} />
                ))}
                {rsvps && !rsvpsLoading && [].map((er) => {
                    return (
                        <EventProvider key={`${er.eventId}-${"rsvp"}`} eventId={er.eventId}>
                            <EventRow checkedIn={er.checkedIn} feedback={er?.feedback} />
                        </EventProvider>
                    );
                })}
            </TableBody>
        </Table>)
}


const SkeletonRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className='w-full h-8 bg-stone-700' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-full h-8 bg-stone-700' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-full h-8 bg-stone-700' />
            </TableCell>
        </TableRow>
    )
}



const EventRow = ({ checkedIn, feedback }: { checkedIn: boolean, feedback: boolean }) => {
    const e = useEventContext()

    const { date, time } = formatDateAndTime(e?.startAt, null, true)

    let action: React.ReactNode;
    // const isLive = useEventStatus(er.startAt, er.endAt);
    if (e.past) {
        if (feedback) {
            action = <Button disabled variant="disabled">Complete</Button>;
        }
        else if (checkedIn) {
            action = <FeedbackButton />;
        } else {
            action = <Button disabled variant="disabled">Past Event</Button>;
        }
    } else if (e?.past2 && feedback) {
        action = <Button disabled variant="disabled">Complete</Button>;

    }
    else if (e.isLive && !checkedIn) {
        action = <CheckInButton />;
    }
    else if (e.past2 && checkedIn) {
        action = <FeedbackButton />;

    } else if (checkedIn) {
        action = <Button disabled variant="disabled">Checked In</Button>;

    } else {
        action = <CancelRsvpButton eventId={e.id} />;
    }

    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >

                <div className="max-w-[300px] truncate overflow-hidden text-ellipsis">   {e.title}</div>
            </TableCell>
            <TableCell>{`${date} | ${time}`}

            </TableCell>
            <TableCell>{action}</TableCell>
        </TableRow>
    )
}