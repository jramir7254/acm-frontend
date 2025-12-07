

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useEvent } from '@/features/events/hooks/use-events';
import { useAppNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { useEventContext, EventProvider } from '@/features/events/context/event-context';
import { RsvpsTable, AttendanceTable, SurveysTable } from './components';
import jspdf, { jsPDF } from 'jspdf'
import { useRef } from 'react';
import { logger } from '@/lib/logger';
import { Heading, Paragraph } from '@/components/text/typography';

import { QuestionChart } from '@/features/events/components/data/question-chart';
import { Separator } from '@/components/primitives/separator';
import { ScrollArea } from '@/components/primitives/scroll-area';

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



    const q1 = data?.eventSurveys.reduce((a, i) => {
        const r = i.q1
        a[r - 1].count += 1
        return a
    }, [
        { label: 'option1', count: 0 },
        { label: 'option2', count: 0 },
        { label: 'option3', count: 0 },
        { label: 'option4', count: 0 },
        { label: 'option5', count: 0 }
    ])


    logger.debug(q1)

    return (

        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full  border-2 border-accent rounded-md">
            <Button onClick={toEvents} size='icon' variant={'ghost'}><ArrowLeft /></Button>
            <div className='flex size-full gap-5'>

                <div className='w-[45%] '>
                    <Heading>{event?.title || 'null'}</Heading>
                    <Paragraph>{event?.formatted.date} {event?.formatted.time}</Paragraph>
                    <Paragraph>{event?.location}</Paragraph>
                    <Paragraph>{event?.host}</Paragraph>
                    <Paragraph>{event?.description}</Paragraph>
                </div>

                <Separator orientation='vertical' />

                <Tabs defaultValue="rsvps" className="size-full">
                    <TabsList>
                        <TabsTrigger value="rsvps">RSVPS</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="surveys">Feedback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rsvps">
                        <RsvpsTable eventRsvps={data?.eventRsvps} />

                    </TabsContent>
                    <TabsContent value="attendance">
                        <AttendanceTable eventAttendance={data?.eventAttendance} />
                    </TabsContent>
                    <TabsContent value="surveys">
                        <h2>Feedback</h2>
                        <ScrollArea >
                            <div className='max-h-[500px]'>
                                <QuestionChart questionNum={1} data={q1} />
                                <QuestionChart questionNum={2} data={q1} />
                                <QuestionChart questionNum={3} data={q1} />
                                <QuestionChart questionNum={4} data={q1} />

                            </div>

                        </ScrollArea>
                        {/* <SurveysTable eventSurveys={data?.eventSurveys} /> */}
                    </TabsContent>

                </Tabs>
            </div>
        </Gradient>
    )
}