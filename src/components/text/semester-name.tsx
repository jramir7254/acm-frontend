import React from 'react'
import { Text } from './typography'
import { useCurrentSemester } from '@/features/app/use-semester'
import { capitalize } from '@/lib/utils'

export function SemesterName({ className }: { className?: string }) {
    const { data: semester, isLoading } = useCurrentSemester()

    return (
        <Text fallBack='None' isLoading={isLoading} className={className}>
            {semester && capitalize(semester.season) + " " + semester.year}
        </Text>
    )
}
