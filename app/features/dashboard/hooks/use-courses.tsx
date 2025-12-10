import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";

import { toast } from "sonner";

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
        queryFn: () => backend.get('/public/courses'),
        staleTime: 24 * 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}

export function useCourse(courseId: number) {
    const { data } = useCourses()

    const course = data?.find(c => c.id === courseId)
    return course
}


export function useAddCourse() {
    const qc = useQueryClient();
    return useMutation({

        mutationFn: (form: Courses) => backend.post(
            '/public/courses',
            form
        ),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['courses'] });
            toast.success("Course Added")
        },
        onError: () => {
            toast.error("Failed to add course")
        }
    });
}
