import { Button } from '@/components/ui/button'
import { FeedbackFormOverlay } from '../../forms/feedback-form/form-overlay'
import type { EventIdentifiers } from '@/features/events/types'


export function FeedbackButton({ event }: { event: EventIdentifiers }) {


    return (
        <FeedbackFormOverlay event={event}>
            <Button variant='default'>Feedback</Button>
        </FeedbackFormOverlay>
    )
}


