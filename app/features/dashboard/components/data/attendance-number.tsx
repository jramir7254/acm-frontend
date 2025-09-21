import React from 'react'
import { AnimatedNumber } from '@/components/ui/number'
import { useMe } from '@/features/auth/hooks/use-me'
import { useUserAttendance } from '../../hooks/use-user'

export function Attendance({ type }: { type: 'complete' | 'pending' }) {
    const { data, isRefetching, isLoading } = useUserAttendance()
    // console.log({ isRefetching, isLoading })  
    return (
        <AnimatedNumber
            num={data?.attendance[type]}
            shouldAnimate={isRefetching}
            shouldNot={isLoading}
            className="text-3xl font-rubik"
        />
    )
}
