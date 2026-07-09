import { logger } from "@/lib/logger";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { tokenStore } from "../lib/token-store";
import { clearPersistedQueryCache } from "@/providers/query-client";
import { backend, client } from "@/lib/backend-api";

import type { AuthMode, Purpose, AuthResponse } from "../types";
import { useAppNavigation } from "@/hooks";
import { useNavigate } from "react-router";





export function useAuthActions() {
    const navigate = useNavigate();

    const { toVerify, toDashboard, toAuth } = useAppNavigation();

    return useMutation<AuthResponse, Error, { mode: AuthMode; data: any }>({

        mutationFn: ({ mode, data }) => backend.post(`/auth/${mode}`, data),

        onSuccess: (data, variables) => {
            logger.warn('in here')
            const { mode } = variables;
            const { token } = data;

            logger.debug("TOKEN", { token, data })

            if (["login", "reset", "verify"].includes(mode)) {
                tokenStore.set(token);

                if (mode === 'verify') {
                    const { purpose } = data
                    if (purpose === 'reset') {
                        return toAuth('reset')
                    }
                }


                return toDashboard();
            }

            if (mode === "register") {
                return toVerify(token, "verify");
            }

            if (mode === "forgot") {
                return toVerify(token, "reset");
            }
        },

        onError: (data) => {
            logger.warn('should be here here')

            if (data && data?.redirectUrl) {
                navigate(data?.redirectUrl)
            }
        }
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
            queryClient.removeQueries({ queryKey: ['users'], });
            queryClient.removeQueries({ queryKey: ['user'], });
            queryClient.removeQueries({ queryKey: ['me'], exact: false });
            clearPersistedQueryCache();
            toAuth('login')
        }
    }
}


export function useRole() {
    return useQuery({
        queryKey: ['user', 'role'],
        queryFn: () => backend.get(
            '/auth/role'
        ),
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
