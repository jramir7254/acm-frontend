import { Button } from '@/components/primitives/button'
import FeedbackForm from '../forms/feedback-form'
import { Overlay } from '@/components/ui'
import { useEventContext } from '@/features/events/context/event-context'


export function FeedbackButton() {
    const eventContext = useEventContext()
    const eventName = eventContext?.title

    return (
        <Overlay
            title={`Provide feedback for the ${eventName} workshop`}
            className='h-full min-w-screen rounded-none md:min-w-[65vw] md:rounded-md md:h-auto'
            description='Complete this feedback form to fully account your attendance for this event.'
            trigger={<Button variant='default'>Feedback</Button>}
        >
            <FeedbackForm />
        </Overlay>
    )
}


