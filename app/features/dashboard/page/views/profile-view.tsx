import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { Separator } from '@/components/primitives/separator';
import Number from '@/components/ui/number'
import Gradient from '@/components/layout/gradient';
import { useEvents } from '../../../events/hooks/use-events'
import { useUserRsvps, useMe } from "@/features/auth/hooks/useMe";
import { CancelRsvpButton } from '../../components/buttons'
import Centered from '@/components/layout/centered';
export default function Main() {
    const { data: events } = useEvents()
    const { data: user } = useMe()
    const { data: rsvps, isLoading: rsvpsLoading } = useUserRsvps(user?.epccId);



    if (rsvpsLoading) return <p>No</p>


    // Merge based on id
    const ids = rsvps?.map(obj => obj.eventId) || [];
    const merged = (events || []).filter(e => ids.includes(e.id))



    return (
        <section className='size-full p-10 grid gap-5 grid-cols-5 grid-rows-5 '>
            <Gradient className='flex p-6 col-span-5 row-span-1 '>
                <Centered className='w-[15%]'>
                    <h3>Points</h3>
                    <Number num={user?.points} className='text-3xl font-rubik' />
                </Centered>
                <Separator orientation='vertical' />
                <Centered className='w-[15%]'>
                    <h3>Events Attended</h3>
                    <Number num={user?.eventsAttended} className='text-3xl font-rubik' />
                </Centered>

            </Gradient>
            <div className='col-span-2 row-span-4 bg-accent rounded-[12px]'>
                {/* <pre>
                <code>
                    {JSON.stringify(user, null, 4)}
                </code>
            </pre> */}
            </div>
            <div className='col-span-3 row-span-4 bg-accent rounded-[12px] p-5'>
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
                        {merged.map((er, i) => (
                            <TableRow key={er.id * i + user.epccId}>
                                <TableCell className="font-medium">{er.title}</TableCell>
                                <TableCell>{new Date(er.date).toLocaleString()}</TableCell>
                                <TableCell>
                                    <CancelRsvpButton eventId={er.id} />
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
