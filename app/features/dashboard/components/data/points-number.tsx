import { AnimatedNumber } from '@/components/ui/number'
import { useMyPoints } from '@/features/users/hooks/me/queries'

export function Points() {
    const { data, isRefetching, isLoading } = useMyPoints()
    return (
        <AnimatedNumber
            num={data?.points}
            shouldAnimate={isRefetching}
            shouldNot={isLoading}
            className="text-3xl font-rubik"
        />
    )
}