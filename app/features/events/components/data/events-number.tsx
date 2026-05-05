import { AnimatedNumber } from '@/components/other/animated-number'
import { useEvents } from '@/features/events/hooks/events/queries'

export function EventsNumber() {
    const { data } = useEvents()
    return (
        <AnimatedNumber
            num={data?.length || 0}
            className="text-5xl font-rubik"
        />
    )
}