import React from 'react'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { useMyAttendance } from '@/features/users/hooks/me/queries'

export function AttendanceNumber({ type }: { type: 'complete' | 'missing' }) {
    const { data, isRefetching, isLoading } = useMyAttendance()

    if (!data) return

    const num = data.filter(e => e.status === type).length


    return (
        <AnimatedNumber
            num={num}
            className="text-xl md:text-3xl font-rubik"
        />
    )
}
