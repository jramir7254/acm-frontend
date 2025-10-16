import { useNavigate } from "react-router";
import { logger } from "@/lib/logger";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as AuthAPI from "../api/auth-api";
import { me } from "@/features/dashboard/api/user-api";
import { type LoginInput, type RegisterInput } from "../api/auth-api";
import { tokenStore } from "../services/token-store";
import { clearPersistedQueryCache } from "@/providers/query-client";
import { prefetchUserQueries } from "@/features/dashboard/hooks/use-user";

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const login = async ({ epccId, password }: LoginInput): Promise<string> => {
        try {
            logger.startProcess('LOGIN')

            const { accessToken, epccId: userId } = await AuthAPI.login({ epccId, password });
            tokenStore.set(accessToken, { persist: 'local' });

            await prefetchUserQueries(queryClient)

            await queryClient.prefetchQuery({
                queryKey: ['user', 'role'],
                queryFn: () => AuthAPI.getPermissions(),
            })

            return userId

        } catch (error: any) { throw error } finally { logger.endProcess() }
    }


    const register = async ({ epccId, email, password }: RegisterInput) => {
        try {
            logger.startProcess('REGISTER')

            const { token } = await AuthAPI.register({ epccId, email, password });
            return { token: token ?? null };

        } catch (error) { throw error } finally { logger.endProcess() }
    }

    const forgot = async ({ epccId, email }: RegisterInput) => {
        try {
            logger.startProcess('REGISTER')
            logger.debug('forgot hook', { epccId, email })
            const { token } = await AuthAPI.forgot({ epccId, email });
            return { token: token ?? null };

        } catch (error) { throw error } finally { logger.endProcess() }
    }


    const reset = async (newPassword: string) => {
        try {
            logger.startProcess('RESET')

            const { accessToken, epccId } = await AuthAPI.reset({ newPassword });
            tokenStore.set(accessToken, { persist: "local" });

            await queryClient.prefetchQuery({
                queryKey: ['user', 'me'],
                queryFn: me,
            });

            return epccId


        } catch (error) { throw error } finally { logger.endProcess() }
    }


    const verify = async ({ token, code, purpose }: { token: string, code: string, purpose: AuthAPI.Purpose }): Promise<string> => {
        try {
            logger.startProcess('VERIFY')
            const { accessToken, epccId } = await AuthAPI.verifyEmail({ token, code, purpose });
            tokenStore.set(accessToken, { persist: "local" });

            if (purpose === 'verify') {

                await queryClient.prefetchQuery({
                    queryKey: ['user', 'me'],
                    queryFn: me,
                });
            }


            return epccId

        } catch (error) { throw error } finally { logger.endProcess() }
    }



    const logout = async () => {
        try {
            await AuthAPI.logout();
        } finally {
            tokenStore.clear();
            queryClient.removeQueries({ queryKey: ['user'] });
            clearPersistedQueryCache();
            navigate("/auth", { replace: true });
        }
    }


    return { login, register, verify, logout, forgot, reset }
}



export const useRole = () => {
    return useQuery({
        queryKey: ['user', 'role'],
        queryFn: AuthAPI.getPermissions,
        staleTime: 60 * 60 * 1000, // 1h fresh
        gcTime: 7 * 24 * 60 * 60 * 1000, // keep cached for 7 days
    });
}
