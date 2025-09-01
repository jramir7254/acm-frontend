import { AnimatedNumber } from '@/components/ui/number'
import { useUserPoints } from '../../hooks/use-user'

export function Points() {
    const { data, isRefetching, isLoading } = useUserPoints()
    return (
        <AnimatedNumber
            num={data?.points}
            shouldAnimate={isRefetching}
            shouldNot={isLoading}
            className="text-3xl font-rubik"
        />
    )
}