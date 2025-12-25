import React from 'react'
import { useCourses } from '../hooks/queries'
import { SelectContent, SelectGroup, SelectItem } from '@/components/primitives/select'
import { createCourseName } from '@/lib/utils'

export function CourseSelect() {
    const { data: courses } = useCourses()

    if (!courses) return

    return (
        <SelectContent className='w-fit'>
            <SelectGroup>
                {courses.map(course => (
                    <SelectItem key={`course_${course.id}`} value={String(course.id)}>
                        {createCourseName(course)}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    )
}
