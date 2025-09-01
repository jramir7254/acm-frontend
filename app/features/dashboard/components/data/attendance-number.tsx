import React from 'react'
import { AnimatedNumber } from '@/components/ui/number'
import { useMe } from '@/features/auth/hooks/use-me'
import { useUserAttendance } from '../../hooks/use-user'

export function Attendance({ ...props }) {
    const { data, isRefetching, isLoading } = useUserAttendance()
    // console.log({ isRefetching, isLoading })  
    return (
        <AnimatedNumber
            num={data?.attendance}
            shouldAnimate={isRefetching}
            shouldNot={isLoading}
            className="text-3xl font-rubik"
        />
    )
}
