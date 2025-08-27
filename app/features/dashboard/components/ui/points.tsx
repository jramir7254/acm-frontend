import React from 'react'
import { AnimatedNumber } from '@/components/ui/number'
import { useMe } from '@/features/auth/hooks/use-me'
import { useUserPoints } from '../../hooks/use-points'

export function Points({ ...props }) {
    const { data: user } = useMe()
    const { data } = useUserPoints(user?.epccId)
    return (
        <AnimatedNumber num={(data?.points) || 0} className='text-3xl font-rubik' />
    )
}
