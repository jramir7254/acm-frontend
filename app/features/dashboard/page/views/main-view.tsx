import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { Separator } from '@/components/primitives/separator';
import { Points, Attendance } from '../../components/ui';
import Gradient from '@/components/layout/gradient';
import { useEvents } from '../../../events/hooks/use-events'
import { useUserRsvps, useMe } from "@/features/auth/hooks/use-me";
import { CancelRsvpButton, CheckInButton } from '../../components/buttons'
import { Centered, Tape, UnderConstruction, UnderConstructionCard } from '@/components/layout';
import { Button } from '@/components/primitives/button';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';

export default function Main() {
    const { data: events } = useEvents()
    const { data: user } = useMe()
    const { data: rsvps, isLoading: rsvpsLoading } = useUserRsvps();




    if (rsvpsLoading) return <p>No</p>



    return (
        <section className='size-full p-10 grid gap-5 grid-cols-6 grid-rows-5 '>
            <Gradient className='flex p-6 col-span-6 row-span-1 border-2 border-accent'>
                <Centered className='w-[15%]'>
                    <h3>Points</h3>
                    <Points />
                </Centered>

                <Separator orientation='vertical' />

                <Centered className='w-[15%]'>
                    <h3>Events Attended</h3>
                    <Attendance />
                </Centered>

            </Gradient>

            <UnderConstructionCard className='col-span-2 row-span-4 bg-accent rounded-[12px] border-8 '>
                {/* <Tape rotate='20deg' top='50%' width='105%' />
                <Tape rotate='-20deg' top='50%' width='105%' /> */}
            </UnderConstructionCard>


            <div className='col-span-4 row-span-4 bg-accent rounded-[12px] p-5'>
                <h2>My RSVP'd events</h2>
                <Table>
                    <TableCaption>A list of your rsvp'd events.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-2/4">Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rsvps && rsvps.map((er) => {
                            return (
                                <EventProvider key={`${er.eventId}-${user?.epccId ?? "me"}`} eventId={er.eventId}>
                                    <EventRow checkedIn={er.checkedIn} />
                                </EventProvider>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}



const EventRow = ({ checkedIn }: { checkedIn: boolean }) => {
    const e = useEventContext()


    let action: React.ReactNode;
    // const isLive = useEventStatus(er.startAt, er.endAt);
    if (e.past) {
        action = <Button disabled variant="disabled">Past</Button>;
    } else if (checkedIn) {
        action = <Button disabled variant="disabled">Checked In</Button>;

    }
    else if (e.isLive) {
        action = <CheckInButton eventId={e.id} />;
    } else {
        action = <CancelRsvpButton eventId={e.id} />;
    }

    return (
        <TableRow className='hover:bg-background cursor-pointer transition-colors duration-200'>
            <TableCell className="font-medium">{e.title}</TableCell>
            <TableCell>{e.startAt.toLocaleString()}</TableCell>
            <TableCell>{action}</TableCell>
        </TableRow>
    )
}