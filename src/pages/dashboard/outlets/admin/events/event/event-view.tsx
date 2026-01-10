

import Gradient from '@/components/layout/gradient'
import { Button } from '@/components/primitives/button';
import { useEvent } from '@/features/events/hooks/event/queries';
import { useAppNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"

import { logger } from '@/lib/logger';
import { Definition, Description, Heading, Italic, Item, Paragraph } from '@/components/text/typography';
import { QuestionChart } from '@/features/events/components/data/question-chart';
import { UsersTable } from '@/features/events/components/data/users-table';
import { Separator } from '@/components/primitives/separator';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { FeedbackTable } from '@/features/events/components/data/feedback-table';
import type { Event } from '@/features/events/types/event';
import { formatDateAndTime } from '@/lib/utils';
import { EditEventButton } from '@/features/events/components/buttons/admin';

export default function EventView() {
    const { toEvents, eventId, toPrevious } = useAppNavigation()
    const { data: event } = useEvent(Number(eventId))

    if (!event || !eventId) return

    const { date, time } = formatDateAndTime(event?.startAt, event?.endAt)

    return (

        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full  border-2 border-accent rounded-md">
            <Button onClick={toPrevious} size='icon' variant={'ghost'}><ArrowLeft /></Button>
            <div className='flex size-full gap-5'>

                <div className='w-[45%] '>
                    <Heading>{event?.title || 'null'} <EditEventButton event={event} /></Heading>
                    <Description>
                        <Item>
                            Date: <Italic muted>{date} {time}</Italic>
                        </Item>
                        <Item>Location: <Italic muted>{event?.location}</Italic></Item>
                        <Item>Host: <Italic muted>{event?.host}</Italic></Item>
                        <Separator />
                        <Paragraph>
                            {event?.description}
                        </Paragraph>
                    </Description>
                </div>

                <Separator orientation='vertical' />

                <Tabs defaultValue="rsvps" className="size-full">
                    <TabsList>
                        <TabsTrigger value="rsvps">RSVPS</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="surveys">Feedback</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rsvps">
                        <UsersTable eventId={Number(eventId)} field='rsvps' />

                    </TabsContent>
                    <TabsContent value="attendance">
                        <UsersTable eventId={Number(eventId)} field='attendance' />
                    </TabsContent>
                    <TabsContent value="surveys">
                        <Tabs defaultValue='all'>
                            <TabsList>
                                <TabsTrigger value='all'>All</TabsTrigger>
                                {Array.from({ length: 4 }, (_, i) => (
                                    <TabsTrigger value={`q${i + 1}`} key={i}>Question {i + 1}</TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value='all'>
                                <FeedbackTable eventId={Number(eventId)} />
                            </TabsContent>
                            {Array.from({ length: 4 }, (_, i) => (
                                <TabsContent value={`q${i + 1}`} key={i}>
                                    <QuestionChart eventId={Number(eventId)} questionNum={i + 1 as 1 | 2 | 3 | 4} />
                                </TabsContent>
                            ))}
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </Gradient>
    )
}
