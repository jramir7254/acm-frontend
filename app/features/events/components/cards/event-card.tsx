import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/primitives/card';
import { type Event } from '../../types/event';
import { Separator } from '@/components/primitives/separator';
import Admin from '@/components/layout/admin';
import { MapPin, Calendar } from "lucide-react";
import { formatDateAndTime } from '@/utils/format-date';
import { RsvpButton, DeleteEventButton, EditEventButton } from '../buttons';
import { createContext, useContext } from 'react';





const EventContext = createContext<Event | null>(null)

export const useEventContext = () => {
    const v = useContext(EventContext);
    if (!v) return null
    return v;
};


export function EventCard(event: Event) {

    const { id, imageUrl, title, date, time, host, location, description, isRsvpd } = event

    const result = formatDateAndTime(date, time);


    return (
        <EventContext.Provider value={event}>

            <Card className="flex flex-col overflow-hidden pt-0 h-[50vh]">
                <CardHeader className="group p-0 relative h-1/2 overflow-hidden">
                    <Admin className='absolute flex top-2 right-2 z-10 gap-2'>
                        <DeleteEventButton eventId={id} />
                        <EditEventButton />
                    </Admin>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 hover:opacity-100 transition duration-300">
                        <div className="absolute bottom-0 p-4 text-slate-100">
                            <p className="text-sm leading-relaxed ">{description}</p>
                        </div>
                    </div>
                </CardHeader>



                <CardContent>
                    <CardTitle className="text-lg">{title}</CardTitle>

                    <div className="flex flex-col  text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 h-5">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={date}>{result.date}</time>
                            <Separator orientation="vertical" className="h-3" />
                            <time dateTime={time}>{result.time}</time>

                        </div>
                        <div className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <p>{location}</p>
                        </div>
                        <p>Presenter: {host}</p>
                    </div>
                </CardContent>



                <CardFooter className="mt-auto flex gap-3">
                    <RsvpButton eventId={id} />
                </CardFooter>
            </Card>
        </EventContext.Provider>
    );
}
