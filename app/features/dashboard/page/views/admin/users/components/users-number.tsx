import { AnimatedNumber } from '@/components/ui/number'
import { useUsers } from '@/features/users/hooks/users/queries'
export function UsersNumber() {
    const { data, isRefetching, isLoading } = useUsers()
    return (
        <AnimatedNumber
            num={data?.length}
            className="text-5xl font-rubik"
        />
    )
}