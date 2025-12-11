import { backend } from "@/lib/backend-api"
import { useQuery } from "@tanstack/react-query"

export interface Courses {
    id: number,
    instructorFirstName: string
    instructorLastName: string
    title: string
    subject: string
    courseNumber: string
    name: string
}


export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => backend.get<Courses[]>(
            '/public/courses',
        ),
        placeholderData: [],
        staleTime: 5 * 60_000,
        gcTime: 24 * 60 * 60_000,
    });
}

export function useCourse(courseId: number) {
    const { data } = useCourses()

    const course = data?.find(c => c.id === courseId)
    return course
}

