import { Button } from '@/components/primitives/button'
import { Overlay } from '@/components/ui'
import { CheckInOverlay } from '../../overlays/check-in-overlay'
import type { Event } from '@/features/events/types/event'
import type { EventIdentifiers } from '@/features/events/type'


export function CheckInButton({ event }: { event: EventIdentifiers }) {
    return (
        <CheckInOverlay event={event}
        >
            <Button variant='default'>Check In</Button>
        </CheckInOverlay>
    )
}
