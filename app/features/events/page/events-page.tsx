// features/events/pages/EventsPage.tsx
import { EventCard, AddEventCard, SkeletonCard } from "../components/cards";
import { Separator } from "@/components/primitives/separator";
import { PermissionGuard, Page, Container } from "@/components/layout";
import { FilterEventsButton } from "../components/buttons/filter-events";
import { useMemo, useState } from "react";
import {
    EventsIndexProvider,
    useEventsList,
    useEventsLoading,
    type Event
} from "../context/index-context";
import { EventProvider } from "../context/event-context";

function GridSkeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
}

export type EventFilters = {
    past: boolean;
    upcoming: boolean;
};

function EventsPageInner() {

    const [filters, setFilters] = useState<EventFilters>({
        past: false,
        upcoming: true,
    });


    return (
        <Page>
            <section className="h-[25vh] md:h-[45vh] flex justify-center items-center">
                <h1 className="font-quick text-5xl md:text-8xl">Events</h1>
            </section>

            <Container
                className="min-h-screen bg-background py-20 pb-[100vh] flex flex-col gap-5 border-y-2 border-accent"
                classNameMac="px-10"
                classNameLarge="px-30"
                classNameMobile="px-10">
                <div className="ml-auto">
                    <FilterEventsButton filters={filters} onChange={setFilters} />
                </div>
                <Separator />
                <Container className="grid gap-6 lg:grid-cols-3 sm:grid-cols-1" classNameMac="">
                    <EventsIndexProvider>
                        <EventsList filters={filters} />
                    </EventsIndexProvider>

                    <PermissionGuard resource="events" requiredActions={["create"]}>
                        <AddEventCard />
                    </PermissionGuard>
                </Container>
            </Container>
        </Page>
    );
}



function EventsList({ filters }: { filters: EventFilters }) {
    const events = useEventsList();
    const { isLoading, isFetching } = useEventsLoading();



    const visibleEvents = useMemo<Event[]>(() => {
        const showPast = filters.past;
        const showUpcoming = filters.upcoming;

        let list = events.filter((e) => {
            if (showPast && e.past) return true;
            if (showUpcoming && !e.past) return true;
            return false;
        });

        // optional sorting for nicer UX
        list = list.slice().sort((a, b) => {
            const aT = new Date(a.startAt).getTime();
            const bT = new Date(b.startAt).getTime();
            if (a.past && b.past) return bT - aT;       // past: newest first
            if (!a.past && !b.past) return aT - bT;     // upcoming: soonest first
            return a.past ? 1 : -1;                     // upcoming before past
        });

        return list;
    }, [events, filters]);

    const loading = isLoading || isFetching;

    if (loading) return <GridSkeleton count={3} />
    if (!loading && !visibleEvents.length) {
        return (
            <div className="flex items-center bg-matte-black  justify-center h-64 col-span-3 rounded-xl ">
                <div className="text-center bg-matte-black p-8 max-w-md">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        No events available
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Try adjusting your filters or check back later.
                    </p>
                </div>
            </div>
        )
    }

    if (!loading) return (
        <>

            {visibleEvents.map((e) => (
                <EventProvider key={e.id} eventId={e.id} fallback={<SkeletonCard />}>
                    <EventCard /* inside, children can call useEventContext() */ />
                </EventProvider>
            ))}
        </>
    )
}

export default function EventsPage() {
    return (
        <EventsPageInner />
    );
}
