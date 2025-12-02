
import { backend } from "@/lib/api/backend";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const authKeys = {
    all: ['auth'] as const,
    roles: () => [...authKeys.all, "roles"] as const,
    permissions: () => [...authKeys.all, "perms"] as const,

};



// export function useRoles() {
//     return useQuery({
//         queryKey: authKeys.roles(),
//         queryFn: backend.get({

//         }),
//         staleTime: 60 * 60 * 1000, // 1h fresh
//         gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
//     });
// }
