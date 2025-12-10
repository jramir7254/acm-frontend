import React from 'react'
import { AnimatedNumber } from '@/components/ui/number'
import { useMyAttendance } from '@/features/users/hooks/me/queries'

export function Attendance({ type }: { type: 'complete' | 'pending' }) {
    const { data, isRefetching, isLoading } = useMyAttendance()
    return (
        <AnimatedNumber
            num={data?.attendance[type]}
            shouldAnimate={isRefetching}
            shouldNot={isLoading}
            className="text-3xl font-rubik"
        />
    )
}
