import { AnimatedNumber } from '@/components/other/animated-number'
import { useUserPoints } from '../../hooks/queries'

export function PointsNumber() {
    const { data, isRefetching, isLoading } = useUserPoints('me')
    return (
        <AnimatedNumber
            num={data}
            className="text-xl md:text-3xl font-rubik"
        />
    )
}