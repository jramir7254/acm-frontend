import { Button } from "@/components/ui/button";
import { useActionButton } from "@/features/events/hooks/mutations";
import { type Event } from "@/features/events/types";
import { useMemo } from "react";
import { useCurrentSemester } from "@/features/app/use-semester";
import { useBaseUser, useUserRsvps } from "@/features/users/hooks/queries";




export function EventActionButton({ event }: { event: Event }) {
    const { data: rsvps } = useUserRsvps("me");
    const { data: user } = useBaseUser("me");
    const { mutate } = useActionButton({ ...event });

    // const rsvpsList = rsvps?.map(r => r.eventId)



    const { id, type, externalLink, endAt, semesterCreatedId } = event;

    const isRsvpd = useMemo(() => {
        return rsvps?.some(s => s.eventId == id)
    }, [rsvps, rsvps?.length])


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
    } else if (!user.accountComplete) {
        disabled = true;
    }

    return (
        <Button
            className=""
            onClick={() => mutate()}
            disabled={disabled}
        // variant={disabled ? "disabled" : "default"}
        >
            {label}
        </Button>
    );
}
