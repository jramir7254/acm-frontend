import { Button } from '@/components/primitives/button'
import FeedbackForm from '../../forms/feedback-form/feedback-form'
import { Overlay } from '@/components/ui'
import { FeedbackFormOverlay } from '../../forms/feedback-form/form-overlay'
import type { Event } from '@/features/events/types/event'


export function FeedbackButton({ event }: { event: Event }) {


    return (
        <FeedbackFormOverlay event={event}>
            <Button variant='default'>Feedback</Button>
        </FeedbackFormOverlay>
    )
}


