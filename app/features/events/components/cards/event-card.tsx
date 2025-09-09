import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/primitives/card';
import { Separator } from '@/components/primitives/separator';
import { PermissionGuard, Container } from '@/components/layout';
import { MapPin, Calendar } from "lucide-react";
import { RsvpButton, DeleteEventButton, EditEventButton, ShowCodeButton, InfoButton } from '../buttons';
import { Heading, Text } from '@/components/text';
import { useEventContext } from "@/features/events/context/event-context";
import { useState } from 'react';
import { useIsMobile } from '@/hooks';

const styles = {
    default: 'h-[50vh]',
    mobile: 'h-[35vh]',
    mac: 'h-[50vh]'
}


export function EventCard() {
    const [showInfo, setShowInfo] = useState(false)
    const isMobile = useIsMobile()
    const e = useEventContext();
    if (!e) return null; // provider not mounted
    const { id, imageUrl, title, startAt, endAt, host, location, description, isLive, formatted } = e

    const style = isMobile ? {
        opacity: showInfo ? '100%' : '0%'
    } : undefined

    return (

        <Container classNameLarge='h-[50vh]' classNameMac={styles.mac} classNameMobile={styles.mobile}>
            <Card className="flex flex-col overflow-hidden pb-2 md:pb-6 pt-0 size-full">
                <CardHeader className="group p-0 relative h-1/2 overflow-hidden">

                    <PermissionGuard resource='events' requiredActions={['delete', 'update']}>
                        <div className='absolute flex top-2 right-2 z-10 gap-2 text-lg'>
                            <DeleteEventButton eventId={id} />
                            <EditEventButton />
                            <ShowCodeButton isLive={isLive} />
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
                        className=" md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 hover:opacity-100 transition duration-300">
                        <div className="absolute bottom-0 p-4 text-slate-100">
                            <Text className="leading-relaxed ">{description}</Text>
                        </div>
                    </div>
                </CardHeader>


                <CardContent className='flex flex-col'>
                    <CardTitle>
                        <Heading className="line-clamp-2 md:min-h-[3.50rem]">{title}</Heading>
                    </CardTitle>
                    <div className="flex flex-col md:gap-1  text-slate-600 dark:text-slate-400 mt-3 md:mt-2">
                        <div className="inline-flex items-center gap-1 md:h-5">
                            <Calendar className={isMobile ? "h-3 w-3" : 'h-4 w-4'} />
                            <Text>{formatted.date}</Text>
                            <Separator orientation="vertical" className="h-3" />
                            <Text>{formatted.time}</Text>
                        </div>
                        <div className="inline-flex items-center gap-1.5">
                            <MapPin className={isMobile ? "h-3 w-3" : 'h-4 w-4'} />
                            <Text>{location}</Text>
                        </div>
                        <div className='mt-1 md:mt-2'>
                            <Text>Presenter: {host}</Text>
                        </div>
                    </div>
                </CardContent>


                <CardFooter className="mt-auto flex gap-3">
                    <RsvpButton eventId={id} />
                </CardFooter>
            </Card>
        </Container>

    );
}
