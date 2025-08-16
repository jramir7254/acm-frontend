import Page from '@/components/layout/page';
import { useAuth } from '../auth/context/AuthContext';
import { type Event } from '@/types';
import { useEvents } from '@/providers/events-context';
import EventCard, { AddEventCard } from './components/event-card';
import { useUserRsvps } from "@/features/auth/hooks/useMe";
import Admin from '@/components/layout/admin';
export default function EventsPage() {
    const { user, userRsvps } = useAuth()
    let { events } = useEvents();
    console.log(userRsvps)
    if (user && userRsvps) {
        console.log("true:", userRsvps)

        events = events.map(e => (
            {
                ...e,
                isRsvpd: userRsvps.includes(e.id)
            }))
    }







    return (
        <Page>
            <section className='h-[45vh] flex justify-center items-center'>
                <h1 className='font-quick text-8xl'>Events</h1>
            </section>
            <section className='min-h-screen bg-background px-30 py-20'>
                <div className="mx-auto grid  gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events?.map((e: Event) => (
                        <EventCard
                            key={e.id}
                            event={e}
                            id={e.id}
                            imageUrl={e.imageUrl}
                            title={e.title}
                            host={e.host}
                            date={e.date}
                            time={e.time}
                            description={e.description}
                            location={e.location}
                            isRsvpd={e.isRsvpd}
                        />
                    ))}
                    <Admin>
                        <AddEventCard />
                    </Admin>
                </div>
            </section>
        </Page>
    )
}
