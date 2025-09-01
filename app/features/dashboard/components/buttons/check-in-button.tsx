import { Button } from '@/components/primitives/button'
import { CheckInOverlay } from '../overlays/check-in-overlay'


export function CheckInButton() {
    return (
        <CheckInOverlay >
            <Button variant='default'>Check In</Button>
        </CheckInOverlay>
    )
}
