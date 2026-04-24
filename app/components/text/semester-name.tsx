import React from 'react'
import { Text } from './typography'
import { useCurrentSemester, useSemesters } from '@/features/app/use-semester'
import { capitalize } from '@/lib/utils'

export function SemesterName({ className }: { className?: string }) {
    const { data: semester, isLoading } = useCurrentSemester()

    return (
        <Text fallBack='None' isLoading={isLoading} className={className}>
            {semester && capitalize(semester.season) + " " + semester.year}
        </Text>
    )
}


export function SemestersName({ className, semesterId }: { className?: string, semesterId: string | 'current' }) {
    const { data, isLoading } = useSemesters()

    const semester = data?.find(s => semesterId === 'current' ? s.isCurrent : s.id === Number(semesterId))

    return (
        <Text fallBack='None' isLoading={isLoading} className={className}>
            {semester && capitalize(semester.season) + " " + semester.year}
        </Text>
    )
}
