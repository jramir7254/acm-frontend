import { Button } from "@/components/primitives/button";
import { useRsvp } from "../../hooks/use-events";
import { useEventContext } from "@/features/events/context/event-context";
import { toast } from "sonner";
import { useMe } from "@/features/auth/hooks/use-me";
import { useUserRsvps } from "@/features/dashboard/hooks/use-user";
import { useMemo } from "react";

export function EventActionButton({ eventId }: { eventId: string | number }) {
    const { data: rsvps } = useUserRsvps();
    const { data: user } = useMe();
    const rsvp = useRsvp(eventId);
    const e = useEventContext();
    if (!e) return null; // provider not mounted


    const { id, past } = e;

    let isRsvpd = useMemo(
        () => rsvps?.some(r => r.eventId === id) ?? false,
        [rsvps, id]
    );

    const onSubmit = async () => {
        try {
            await rsvp.mutateAsync();
            isRsvpd = true
            toast.success("Successfully RSVP’d for event");
        } catch {
            toast.error("Error trying to RSVP for event");
        }
    };

    let label = "RSVP";
    let disabled = false;

    if (!user) {
        label = "Log in or register to RSVP";
        disabled = true;
    } else if (past) {
        label = "Past Event";
        disabled = true;
    }
    else if (isRsvpd) {
        label = "RSVP Confirmed";
        disabled = true;
    }

    return (
        <Button className="text-xs w-full h-8 lg:text-sm md:w-auto md:h-auto" onClick={onSubmit} disabled={disabled} variant={disabled ? "disabled" : "default"}>
            {label}
        </Button>
    );
}
