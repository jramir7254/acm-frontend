import React from 'react'
import { AnimatedNumber } from '@/components/ui/number'
import { useMe } from '@/features/auth/hooks/use-me'
import { useUserAttendance } from '../../hooks/use-points'

export function Attendance({ ...props }) {
    const { data: user } = useMe()
    const { data } = useUserAttendance(user?.epccId)
    return (
        <AnimatedNumber num={data?.attendance} className='text-3xl font-rubik' />
    )
}
