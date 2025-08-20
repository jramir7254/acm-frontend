import { Button } from "@/components/primitives/button"
import { useMe } from "@/features/auth/hooks/useMe";
import { useRsvp } from "../../hooks/use-events";
import { useEventContext } from "../cards";



export function RsvpButton({ eventId }: { eventId: string }) {
    const { data: user } = useMe()
    const rsvp = useRsvp(eventId, user?.epccId)
    const { isRsvpd } = useEventContext()

    if (!user) return (
        <Button variant='disabled' disabled>Login or register to RSVP</Button>
    )

    if (isRsvpd) return (
        <Button variant='disabled' disabled>Already RSVP'd</Button>
    )
    return (
        <Button onClick={() => rsvp.mutate()} >RSVP</Button>
    )
}
