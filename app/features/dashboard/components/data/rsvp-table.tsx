import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { Skeleton } from '@/components/primitives/skeleton';
import { useUserRsvps } from '../../hooks/use-user';
import { CancelRsvpButton, CheckInButton } from '../../components/buttons'
import { Button } from '@/components/primitives/button';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';


export function RsvpTable() {
    const { data: userRsvps, isLoading: rsvpsLoading } = useUserRsvps();


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
                {userRsvps && !rsvpsLoading && userRsvps.map((er) => {
                    return (
                        <EventProvider key={`${er.eventId}-${"rsvp"}`} eventId={er.eventId}>
                            <EventRow checkedIn={er.checkedIn} />
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



const EventRow = ({ checkedIn }: { checkedIn: boolean }) => {
    const e = useEventContext()


    let action: React.ReactNode;
    // const isLive = useEventStatus(er.startAt, er.endAt);
    if (e.past) {
        action = <Button disabled variant="disabled">Past Event</Button>;
    } else if (checkedIn) {
        action = <Button disabled variant="disabled">Checked In</Button>;

    }
    else if (e.isLive) {
        action = <CheckInButton />;
    } else {
        action = <CancelRsvpButton eventId={e.id} />;
    }

    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >

                <div className="max-w-[300px] truncate overflow-hidden text-ellipsis">   {e.title}</div>
            </TableCell>
            <TableCell>{e.startAt.toLocaleString()}

            </TableCell>
            <TableCell>{action}</TableCell>
        </TableRow>
    )
}