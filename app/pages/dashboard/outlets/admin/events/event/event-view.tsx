

import { Button } from '@/components/ui/button';
import { useEvent } from '@/features/events/hooks/event/queries';
import { useAppNavigation } from '@/hooks';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { logger } from '@/lib/logger';
import { Definition, Description, Heading, Italic, Item, Paragraph } from '@/components/text/typography';
import { QuestionChart } from '@/features/events/components/data/question-chart';
import { UsersTable } from '@/features/events/components/data/users-table';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FeedbackTable } from '@/features/events/components/data/feedback-table';
import { formatDateAndTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { EditEventButton } from '@/features/events/components/buttons/admin';
import { Card, CardHeader, CardAction, CardDescription, CardFooter, CardTitle, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function EventView() {
    const { toEvents, eventId, toPrevious } = useAppNavigation()
    const { data: event } = useEvent(Number(eventId))

    if (!event || !eventId) return

    const { date, time } = formatDateAndTime(event?.startAt, event?.endAt)

    return (
        <Card className="relative mx-auto w pt-0  rounded-2xl overflow-hidden border">

            <div className='absolute top-5 left-5 z-10'>

                <Button onClick={toPrevious} size='icon' variant={'default'} >
                    <ArrowLeft />
                </Button>
            </div>

            <div className='absolute top-5 right-5 z-10'>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <EditEventButton event={event} />
                        </DropdownMenuItem>
                        <DropdownMenuItem variant='destructive' onClick={() => { toast('User Deleted') }}>Delete</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <img
                src={event.imageUrl}
                alt={event.title}
                className="h-50 w-full  object-cover brightness-60  dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{event?.type}</Badge>
                </CardAction>
                <CardTitle className='text-lg md:text-3xl -translate-y-7.5'>
                    {event?.title || 'null'}
                    {/* <EditEventButton event={event} /> */}
                </CardTitle>
                <CardDescription className='flex'>
                    <div>

                        <Item>
                            Date: <Italic muted>{date} {time}</Italic>
                        </Item>
                        <Item>Location: <Italic muted>{event?.location}</Italic></Item>
                        <Item>Host: <Italic muted>{event?.host}</Italic></Item>
                        <Paragraph>
                            {event?.description}
                        </Paragraph>
                    </div>
                    <div>
                        Numbers
                    </div>
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <Tabs defaultValue="rsvps" className="size-full">
                    <TabsList variant={'line'}>
                        <TabsTrigger value="rsvps">RSVPS</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="surveys">Feedback</TabsTrigger>
                    </TabsList>
                    <ScrollArea className='max-w-[80vw]'>

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
                        <ScrollBar orientation="horizontal" />

                    </ScrollArea>
                </Tabs>

            </CardContent>

        </Card>
    )
}
