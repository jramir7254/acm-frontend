import { AnimatedNumber } from '@/components/ui/number'
import { useNumEvents } from '@/features/events/hooks/events/queries'

export function EventsNumber() {
    const numEvents = useNumEvents()
    return (
        <AnimatedNumber
            num={numEvents}
            className="text-5xl font-rubik"
        />
    )
}