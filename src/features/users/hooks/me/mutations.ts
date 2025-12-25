import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";
import { queryKeys } from "@/lib/query-keys";




export function useUpdateMe() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: any) => backend.patch(
            `/auth/me`, form
        ),
        onSuccess: () => {
            toast.success("Profile updated")
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: queryKeys.me.base() })
        }
    });
}


