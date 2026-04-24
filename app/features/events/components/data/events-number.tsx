import { AnimatedNumber } from '@/components/other/number'
import { useEvents } from '@/features/events/hooks/events/queries'

export function EventsNumber() {
    const { data } = useEvents()
    return (
        <AnimatedNumber
            num={data?.length}
            className="text-5xl font-rubik"
        />
    )
}