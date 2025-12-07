import { logger } from "@/lib/logger";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { me } from "@/features/dashboard/api/user-api";
import { tokenStore } from "../lib/token-store";
import { clearPersistedQueryCache } from "@/providers/query-client";
import { backend } from "@/lib/api/client";

import type { AuthMode, Purpose, AuthResponse } from "../types";
import { useAppNavigation } from "@/hooks";





export function useAuthActions() {
    const { toVerify, toDashboard, toAuth } = useAppNavigation();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, { mode: AuthMode; data: any }>({

        mutationFn: ({ mode, data }) => backend.post(`/auth/${mode}`, data),

        onSuccess: async (data, variables) => {
            const { mode } = variables;
            const { token, epccId } = data;

            if (["login", "reset", "verify"].includes(mode)) {
                tokenStore.set(token);

                if (mode === 'verify') {
                    const { purpose } = data
                    if (purpose === 'reset') {
                        return toAuth('reset')
                    }
                }

                await queryClient.prefetchQuery({
                    queryKey: ["user", "me"],
                    queryFn: me,
                });

                return toDashboard(epccId);
            }

            if (mode === "register") {
                return toVerify(token, "verify");
            }

            if (mode === "forgot") {
                return toVerify(token, "reset");
            }
        },
    });
}


export function useLogout() {
    const queryClient = useQueryClient();
    const { toAuth } = useAppNavigation();

    return async () => {
        try {
            await backend.post(
                '/auth/logout'
            );
        } finally {
            tokenStore.clear();
            queryClient.removeQueries({ queryKey: ['user'] });
            clearPersistedQueryCache();
            toAuth('login')
        }
    }
}


export const useRole = () => {
    return useQuery({
        queryKey: ['user', 'role'],
        queryFn: () => backend.get(
            '/auth/role'
        ),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
