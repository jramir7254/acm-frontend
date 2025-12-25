import { AnimatedNumber } from '@/components/ui/animated-number'
import { useMyPoints } from '@/features/users/hooks/me/queries'

export function PointsNumber() {
    const { data, isRefetching, isLoading } = useMyPoints()
    return (
        <AnimatedNumber
            num={data?.points}
            className="text-3xl font-rubik"
        />
    )
}