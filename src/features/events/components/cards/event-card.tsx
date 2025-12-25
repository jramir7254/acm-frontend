import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/primitives/card';
import { Separator } from '@/components/primitives/separator';
import { PermissionGuard, Container } from '@/components/layout';
import { MapPin, Calendar } from "lucide-react";
import { DeleteEventButton, EditEventButton, ShowCodeButton } from '../buttons/admin';
import { InfoButton } from '../buttons';
import { EventActionButton } from '../buttons/users';
import { useState } from 'react';
import { useIsMobile } from '@/hooks';
import { Paragraph, Heading } from '@/components/text/typography';
import type { Event } from '../../types/event';
import { formatDateAndTime } from '@/lib/utils';




export function EventCard({ event }: { event: Event }) {
    const [showInfo, setShowInfo] = useState(false)
    const isMobile = useIsMobile()

    const { id, imageUrl, title, startAt, endAt, host, location, description, } = event

    const { date, time } = formatDateAndTime(startAt, endAt)

    const now = new Date()

    const isLive = now > new Date(startAt) && now < new Date(endAt)

    const style = isMobile ? {
        opacity: showInfo ? '100%' : '0%'
    } : undefined

    return (

        <Card className=" aspect-square 2xl:aspect-auto max-h-[500px] overflow-hidden pb-2 md:pb-6 pt-0   ">

            <CardHeader className="p-0 group relative  h-[40%] md:h-1/2 overflow-hidden transition-all duration-600">
                <PermissionGuard resource='events' requiredActions={['delete', 'update']}>
                    <div className='absolute flex top-2 right-2 z-10 gap-2 text-lg'>
                        <DeleteEventButton eventId={id} />
                        <EditEventButton event={event} />
                        <ShowCodeButton isLive={isLive} event={event} />
                    </div>
                </PermissionGuard>

                <Container hideInLarge classNameMobile='absolute flex top-2 left-2 z-10 gap-2'>
                    <InfoButton showInfo={showInfo} setShowInfo={setShowInfo} />
                </Container>
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div
                    style={style}
                    className=" md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 hover:opacity-100 hover:h-full transition duration-600">
                    <div className="absolute bottom-0 p-4 text-slate-100">
                        <Paragraph className="leading-relaxed ">{description}</Paragraph>
                    </div>
                </div>
            </CardHeader>


            <CardContent className='flex flex-col gap-2 2xl:gap-5 h-auto'>
                <CardTitle className='space-y-2'>
                    <Heading className="">{title}</Heading>
                    <Separator />
                </CardTitle>


                <div className="flex flex-col gap-1 text-slate-400  justify-center">
                    <div className="inline-flex items-center gap-1 md:h-5">
                        <Calendar className={isMobile ? "h-3 w-3" : 'h-4 w-4'} />
                        <Paragraph className='inline-flex gap-1'>
                            <span>{date}</span>
                            {/* <span>{<Separator orientation="vertical" className="bg-white/40" />}</span> */}
                            <span>{time}</span>
                        </Paragraph>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                        <MapPin className={isMobile ? "h-3 w-3" : 'h-4 w-4'} />
                        <Paragraph>{location}</Paragraph>
                    </div>
                    <div className=''>
                        <Paragraph>Presenter: {host}</Paragraph>
                    </div>
                </div>
            </CardContent>


            <CardFooter className="md:mt-auto flex gap-3">
                <EventActionButton event={event} />
            </CardFooter>
        </Card>
    );
}
