import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { backend } from "@/lib/backend-api";

import { toast } from "sonner";
import type { Courses } from "./queries";

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
