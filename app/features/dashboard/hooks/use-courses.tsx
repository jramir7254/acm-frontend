import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { getCourses } from "@/services/api";
import type { Courses } from "@/services/api";
import * as AdminApi from '../api/admin-api'
import { toast } from "sonner";

export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: getCourses,
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
        mutationFn: (form: Courses) => AdminApi.addNewCourse(form),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['courses'] });
            toast.success("Course Added")
        },
        onError: () => {
            toast.error("Failed to add course")
        }
    });
}
