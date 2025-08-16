import { Card, CardAction, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { type Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Admin from '@/components/layout/admin';
import { MapPin, Calendar, UserCircle, PlusCircle } from "lucide-react";
import RsvpButton from './rsvp-button';
import { DeleteEventButton, EditEventButton } from './admin-buttons';
interface CardProps extends Event {
    event: Event,
    imageAlt?: string,
}

const formatDate = (date: string | Date, timeStr: string): string => {
    date = new Date(date)
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);

    const parsedTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes,
    ).toLocaleTimeString();

    return String(parsedTime)

}

export default function EventCard({ event, id, imageUrl, imageAlt, title, date, time, host, location, description, isRsvpd }: CardProps) {

    return (
        <Card className="flex flex-col overflow-hidden pt-0">
            <div className="group relative h-60 overflow-hidden">
                <Admin className='absolute flex top-0 right-0 z-10'>
                    <DeleteEventButton event={event} eventId={id} />
                    <EditEventButton event={event} eventId={id} />
                </Admin>
                <img
                    src={imageUrl}
                    alt={imageAlt ?? title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 hover:opacity-100 transition duration-300">
                    <div className="absolute bottom-0 p-4 text-slate-100">
                        <p className="text-sm leading-relaxed ">{description}</p>
                    </div>
                </div>
            </div>

            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <div className="flex flex-col  text-sm text-slate-600 dark:text-slate-400">
                    <div className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={date}>{formatDate(date, time)}</time>
                        {/* <Separator orientation="vertical" className="h-4" /> */}
                        {/* <time dateTime={time}>{new Date(time).toTimeString()}</time> */}

                    </div>
                    <div className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <p>{location}</p>
                    </div>
                </div>
            </CardHeader>



            <CardFooter className="mt-auto flex gap-3">
                <RsvpButton isRsvpd={isRsvpd} eventId={id} />
            </CardFooter>
        </Card>
    );
}

export function AddEventCard() {

    return (
        <Card>
            <Button size='icon'><PlusCircle /></Button>
        </Card>
    )

}