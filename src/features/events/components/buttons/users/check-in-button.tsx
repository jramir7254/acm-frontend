import { Button } from '@/components/primitives/button'
import { Overlay } from '@/components/ui'
import { CheckInOverlay } from '../../overlays/check-in-overlay'
import type { Event } from '@/features/events/types/event'

export function CheckInButton({ event }: { event: Event }) {
    return (
        <CheckInOverlay event={event}
        >
            <Button variant='default'>Check In</Button>
        </CheckInOverlay>
    )
}
