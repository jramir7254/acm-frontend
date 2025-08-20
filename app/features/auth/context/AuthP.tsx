import { clearPersistedQueryCache } from "@/lib/query-client";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router";
import { userKeys } from "../hooks/useMe";
import { tokenStore } from "../services/token-store";

import * as AuthAPI from '../services/auth'
// AuthActionsProvider.tsx
const AuthCtx = createContext<{
    token: string | null;
    login: (
        i: { epccId: string; password: string },
        opts?: { persist?: "local" | "session" }
    ) => Promise<void>;
    // ⬇️ change return type to include token
    register: (
        i: { email: string; epccId: string; password: string },
        opts?: { persist?: "local" | "session" }
    ) => Promise<{ token: string | null }>;
    logout: () => Promise<void>;
} | null>(null);
export function AuthActionsProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const qc = useQueryClient();
    const token = tokenStore.get();

    const login = async (creds, opts) => {
        try {
            const { accessToken } = await AuthAPI.login(creds);
            tokenStore.set(accessToken, opts);
            // warm queries
            const me = await qc.fetchQuery({ queryKey: userKeys.me, queryFn: AuthAPI.me });
            if (me?.epccId) {
                qc.prefetchQuery({ queryKey: userKeys.rsvps(me.epccId), queryFn: () => AuthAPI.userRsvps(me.epccId) });
                navigate(`/profile/${me.epccId}`, { replace: true });
            }
        } catch (error) {
            throw error
        }
    };


    const register = async (creds: { email: string; epccId: string; password: string }) => {
        try {
            // Call your real register API — adjust to your API’s response shape
            // Example response: { verifyToken: string }
            const { token } = await AuthAPI.register(creds);

            // Do NOT set tokenStore, do NOT navigate.
            // Just return the token to the caller (AuthForm) so it can route to /auth/verify
            return { token: token ?? null };
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try { await AuthAPI.logout(); } finally {
            tokenStore.clear();
            qc.removeQueries();
            clearPersistedQueryCache();
            navigate("/auth", { replace: true });
        }
    };

    return (
        <AuthCtx.Provider value={{ token, login, register, logout }}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuthActions = () => {
    const v = useContext(AuthCtx);
    if (!v) throw new Error("useAuthActions must be used within AuthActionsProvider");
    return v;
};
