import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";
/**
 * This one for admin to update users
 * @param epccId 
 * @returns 
 */
export function useUpdateUser(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => backend.patch(
            `/users/${epccId}`, form
        ),
        onSuccess: () => {
            toast.success("Profile updated")

            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: queryKeys.users.detail.base(epccId) })
        },
        onError: () => {
            toast.error("An error occured")
        }
    });
}



/**
 * This one for admin to update users
 * @param epccId 
 * @returns 
 */
export function useUpdateUserCourses(epccId: string) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => backend.patch(
            `/users/${epccId}/courses`, form
        ),
        onSuccess: () => {
            toast.success("Profile updated")

            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: queryKeys.users.detail.courses(epccId) })
        },
        onError: () => {
            toast.error("An error occured")
        }
    });
}
