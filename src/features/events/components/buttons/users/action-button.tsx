import { Button } from "@/components/primitives/button";
import { useActionButton } from "@/features/events/hooks/event/mutations";
import { useMe } from "@/features/users/hooks/me/queries";
import { useMyRsvps } from "@/features/users/hooks/me/queries";
import { type Event } from "@/features/events/types/event";




export function EventActionButton({ event }: { event: Event }) {
    const { data: rsvps } = useMyRsvps();
    const { data: user } = useMe();
    const { mutate } = useActionButton({ ...event });

    const rsvpsList = rsvps?.map(r => r.eventId)



    const { id, type, externalLink, endAt } = event;

    const isRsvpd = rsvpsList?.includes(id)


    let label = "RSVP";
    let disabled = false;

    if (!user) {
        label = "Log in or register to RSVP";
        disabled = true;
    } else if (new Date() > new Date(endAt)) {
        label = "Past Event";
        disabled = true;
    } else if (type === 'external' && externalLink) {
        label = 'Visit Site'
    }
    else if (isRsvpd) {
        label = "RSVP Confirmed";
        disabled = true;
    }

    return (
        <Button
            className="text-xs w-full h-8 lg:text-sm md:w-auto md:h-auto"
            onClick={() => mutate()}
            disabled={disabled}
            variant={disabled ? "disabled" : "default"}
        >
            {label}
        </Button>
    );
}
