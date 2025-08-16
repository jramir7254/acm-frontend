import { Button } from "@/components/ui/button"
import { useAuth } from '@/features/auth/context/AuthContext';
import { useRsvp } from "../useEvents";
type Props = {
    isRsvpd: boolean,
    eventId: string
}

export default function RsvpButton({ isRsvpd, eventId }: Props) {
    const { user } = useAuth()
    const rsvp = useRsvp(eventId, user?.epccId)
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
