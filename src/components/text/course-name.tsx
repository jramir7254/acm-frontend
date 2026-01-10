import React from 'react'
import { Text } from './typography'
import { useCourse } from '@/features/edu/hooks/queries'
import { createCourseName } from '@/lib/utils'

export function CourseName({ courseId }: { courseId: number }) {
    const course = useCourse(courseId)

    const courseName = createCourseName(course)

    return (
        <Text fallBack='None'>
            {courseName}
        </Text>
    )
}
