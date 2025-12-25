import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend } from "@/lib/backend-api";

export type UserFields = 'rsvps' | 'attendance' | 'points' | 'events'

export const meKeys = {
    all: ['me'] as const,
    base: () => [meKeys.all, "base"] as const,
    field: (field: UserFields) => [meKeys.all, "field", field] as const,
    rsvps: ["user", "rsvps"] as const,
    points: ["user", "points"] as const,
    attendance: ["user", "attendance"] as const,
};


export function useUpdateMe() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (form: ProfileFormValues) => UserAPI.updateMe(form),
        onSuccess: () => {
            // Option A: immediate UI update
            // qc.setQueryData(userKeys.me, (prev: any) => ({ ...prev, ...data }));
            // Option B (or in addition): refetch fresh data
            qc.invalidateQueries({ queryKey: userKeys.all })
        }
    });
}




