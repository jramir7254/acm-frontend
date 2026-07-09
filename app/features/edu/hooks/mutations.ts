import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";

import { toast } from "sonner";
import { type Course } from "../types";


export function useCreateOrUpdateCourse(courseId?: number) {
    const queryClient = useQueryClient();
    const mode: 'create' | 'update' = courseId ? 'update' : 'create'

    return useMutation({

        mutationFn: (form: Course) => {
            return mode === 'create' ? backend.post('/admin/courses', form) : backend.patch(`/admin/courses/${courseId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast.success(`Course ${mode}d`)

        },
        onError: () => {
            toast.error(`Error ${mode.substring(0, 5)}ing course`)
        }
    });
}
