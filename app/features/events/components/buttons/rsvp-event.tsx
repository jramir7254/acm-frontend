import { Button } from "@/components/primitives/button"
import { useRsvp } from "../../hooks/use-events";
import { useEventContext } from "@/features/events/context/event-context";
import { toast } from "sonner";
import { useUserRsvps, useMe } from "@/features/auth/hooks/use-me";


export function RsvpButton({ eventId }: { eventId: string | number }) {
    const { data: rsvps } = useUserRsvps()
    const { data: user } = useMe()

    const rsvp = useRsvp()
    const e = useEventContext();
    if (!e) return null; // provider not mounted

    const { id, past } = e

    const isRsvpd = rsvps && rsvps.some(r => r.eventId === id)

    if (past) return (
        <Button variant='disabled' disabled>Past Event</Button>
    )

    if (!user) return (
        <Button variant='disabled' disabled>Login or register to RSVP</Button>
    )

    if (isRsvpd) return (
        <Button variant='disabled' disabled>RSVP Confirmed</Button>
    )
    return (
        <Button onClick={() => rsvp.mutate(eventId, {
            onSuccess: () => toast.success("Succesfully RSVP'd for event"),
            onError: () => toast.error("Error trying to RSVP for event"),
        })} >RSVP</Button>
    )
}
