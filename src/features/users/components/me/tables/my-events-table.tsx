import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { CancelRsvpButton, FeedbackButton } from '@/features/events/components/buttons/users';
import { Button } from '@/components/primitives/button';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { formatDateAndTime, isTimeWithin } from '@/lib/utils';
import { _useMyEvents } from '@/features/users/hooks/me/queries';
import { CheckInButton } from '@/features/events/components/buttons/users/check-in-button';
import { logger } from '@/lib/logger';
import type { Event } from '@/features/events/types/event';
import type { UserEvent } from '@/features/users/types';
import { SemesterSelect } from '@/features/app/components/semester-select';
import { Select, SelectTrigger, SelectValue } from '@/components/primitives/select';
import { useCurrentSemester } from '@/features/app/use-semester';

export function MyEventsTable({ semesterId }: { semesterId: string | undefined }) {
    const { data: test, isLoading } = _useMyEvents(semesterId);


    return (
        <ScrollArea className=" max-h[400px] h-[400px] rounded-t-md overflow-x-auto">

            <Table>
                <TableCaption>A list of your rsvp'd and attended events.</TableCaption>
                <TableHeader>
                    <TableRow className='hover:bg-inherit'>
                        <TableHead className="w-2/4">Title</TableHead>
                        <TableHead className='hidden md:block'>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody isLoading={isLoading} cols={3}>
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


type Data = {
    data: { event: Event, eventId: number, checkedInAt?: string | null, status?: 'complete' | 'missing' | null }
}


//  TODO
//  clean this mess up
const EventRow = ({ data }: { data: UserEvent }) => {
    const { data: cs } = useCurrentSemester()

    if (!data) return

    const { date, time } = formatDateAndTime(data?.startAt, null, true)
    const isPast = new Date() > new Date(data?.endAt) || data.semesterCreatedId !== cs?.id
    const isLive = isTimeWithin({ start: data?.startAt, end: data?.endAt, margin: 10 })

    logger.debug(data.semesterCreatedId !== cs?.id)

    let action: React.ReactNode;
    if (isPast) {
        if (data.semesterCreatedId !== cs?.id) {
            action = <Button disabled variant="disabled">Past Event</Button>;

        }
        else if (data?.complete) {
            action = <Button disabled variant="disabled">Complete</Button>;
        }
        else if (data?.checkedInAt) {
            action = <FeedbackButton event={{ id: data.eventId, title: data.title }} />;
        } else {
            action = <Button disabled variant="disabled">Past Event</Button>;
        }
    }
    else if (isLive && !data?.checkedInAt) {
        action = <CheckInButton event={{ id: data.eventId, title: data.title }} />;
    }
    else if (isPast && data?.checkedInAt) {
        action = <FeedbackButton event={{ id: data.eventId, title: data.title }} />;

    } else if (data?.checkedInAt) {
        action = <Button disabled variant="disabled">Checked In</Button>;

    } else {
        action = <CancelRsvpButton eventId={data.eventId} />;
    }

    return (
        <TableRow className='hover:bg-black/40 cursor-pointer transition-colors duration-200'>
            <TableCell >
                <div className="max-w-[200px] md:max-w-[300px] truncate overflow-hidden text-ellipsis">   {data.title || 'no title'}</div>
            </TableCell>
            <TableCell className='hidden md:block'>
                {`${date}  ${time}`}
            </TableCell>
            <TableCell>
                {action}
            </TableCell>
        </TableRow>
    )

}
