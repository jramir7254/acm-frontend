import { Button } from '@/components/ui/button'
import { CheckInOverlay } from '../../overlays/check-in-overlay'
import type { Event } from '@/features/events/types/event'
import type { EventIdentifiers } from '@/features/events/types'


export function CheckInButton({ event }: { event: EventIdentifiers }) {
    return (
        <CheckInOverlay event={event}
        >
            <Button variant='default'>Check In</Button>
        </CheckInOverlay>
    )
}
