import React from 'react'
import { AnimatedNumber } from '@/components/other/animated-number'
import { useUserAttendance } from '../../hooks/queries'

export function AttendanceNumber({ type }: { type: 'complete' | 'missing' }) {
    const { data, isRefetching, isLoading } = useUserAttendance("me")

    if (!data) return

    const num = data.filter(e => e.status === type).length


    return (
        <AnimatedNumber
            num={num || 0}
            className={`${type === 'complete' ? 'text-xl md:text-3xl' : 'text-base'} font-rubik`}
        />
    )
}
