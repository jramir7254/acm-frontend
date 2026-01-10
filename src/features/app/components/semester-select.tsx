import React from 'react'
import { useCurrentSemester, useSemesters } from '../use-semester'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from '@/components/primitives/select'
import { capitalize, createCourseName } from '@/lib/utils'

export function SemesterSelect() {
    const { data: semesters } = useSemesters()


    if (!semesters) return

    const currSemester = semesters.find(s => s.isCurrent)

    return (
        <SelectContent className='w-fit'>
            <SelectGroup>
                <SelectLabel>Current</SelectLabel>
                <SelectItem value={'current'}>
                    {currSemester && capitalize(currSemester.season) + " " + currSemester.year}
                </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
                <SelectLabel>Past</SelectLabel>
                {semesters.filter(s => !s.isCurrent).map(semester => (
                    <SelectItem key={`course_${semester.id}`} value={String(semester.id)}>
                        {semester && capitalize(semester.season) + " " + semester.year}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    )
}
