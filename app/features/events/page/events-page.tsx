import Page from '@/components/layout/page';
import { type Event } from '../types/event';
import { useEvents } from '../hooks/use-events';
import { EventCard, AddEventCard, SkeletonCard } from '../components/cards';
import { useUserRsvps, useMe } from "@/features/auth/hooks/useMe";
import { Suspense } from 'react';
import Admin from '@/components/layout/admin';


function GridSkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
}

export default function EventsPage() {
    const { data: events, isLoading: eventsLoading } = useEvents();
    const { data: user } = useMe()
    const { data: rsvps, isLoading: rsvpsLoading } = useUserRsvps(user?.epccId);


    const getEvents = (): Event[] => {
        if (user && rsvps) {
            const userRsvps = rsvps.map(er => (er.eventId))
            return events?.map(e => ({
                ...e,
                isRsvpd: userRsvps.includes(e?.id)
            }))
        }
        return events
    }

    const loading = eventsLoading || (user?.epccId && rsvpsLoading);



    return (
        <Page>
            <section className='h-[45vh] flex justify-center items-center'>
                <h1 className='font-quick text-8xl'>Events</h1>
            </section>
            <section className='min-h-screen bg-background px-30 py-20'>
                <div className="mx-auto grid gap-6 sm:grid-cols-1 lg:grid-cols-3 ">
                    {loading && <GridSkeleton count={3} />}

                    {!loading && getEvents()?.map((e: Event) => (
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
