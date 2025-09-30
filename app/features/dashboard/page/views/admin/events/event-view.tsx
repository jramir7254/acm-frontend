

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useEvent } from '@/features/events/hooks/use-events';
import { useAppNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { useEventContext, EventProvider } from '@/features/events/context/event-context';
import { RsvpsTable, AttendanceTable } from './components';


export default function EventView() {
    const { toEvents, eventId } = useAppNavigation()


    return (
        <EventProvider eventId={eventId}>
            <EventViewInner />
        </EventProvider>
    )
}

const EventViewInner = () => {
    const { toEvents, eventId } = useAppNavigation()
    const { data } = useEvent(eventId || '')
    const event = useEventContext()

    const grid = {
        mobile: ' h-full p-2 grid grid-cols-1',
        default: 'h-full grid gap-5 grid-cols-4 grid-rows-3'
    }

    return (
        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full grid grid-cols-1 md:grid-cols-2 border-2 border-accent rounded-md">
            <Button onClick={toEvents} size='icon'><ArrowLeft /></Button>
            <h2>{event?.title || 'null'}</h2>
            <Tabs defaultValue="rsvps" className="size-full">
                <TabsList>
                    <TabsTrigger value="rsvps">RSVPS</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                <TabsContent value="rsvps">
                    <h2>RSVPS</h2>
                    <RsvpsTable eventRsvps={data?.eventRsvps} />

                </TabsContent>
                <TabsContent value="attendance">
                    <h2>Attendance</h2>

                    <AttendanceTable eventAttendance={data?.eventAttendance} />
                </TabsContent>

            </Tabs>
        </Gradient>
    )
}