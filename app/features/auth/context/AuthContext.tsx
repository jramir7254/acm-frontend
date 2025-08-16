// app/features/auth/context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { queryClient, clearPersistedQueryCache } from "@/lib/query-client";
import { userKeys } from "@/features/auth/hooks/useMe";

import { useNavigate, useLocation } from "react-router";
import { tokenStore } from "@/features/auth/services/token-store";
import * as AuthAPI from "@/features/auth/services/auth";

type User = AuthAPI.Me | null;
type Persist = "local" | "session";

type AuthCtx = {
    user: User;
    userRsvps: string[],
    token: string | null;
    login: (i: { epccId: string; password: string }, opts?: { persist?: Persist }) => Promise<void>;
    logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [userRsvps, setUserRsvps] = useState<string[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            const t = tokenStore.get();
            if (t) setToken(t);

            // 1) Instant boot from persisted cache (if any)
            const cached = queryClient.getQueryData(userKeys.me);
            if (cached) {
                setUser(cached as any);
                setLoading(false);
                // 2) Background revalidate (will auto-refresh access token if needed)
                queryClient.invalidateQueries({ queryKey: userKeys.me });
                const rsvps = queryClient.getQueryData(userKeys.rsvps(cached?.epccId))
                if (rsvps) {
                    console.log('tyes', rsvps)
                    setUserRsvps(rsvps);
                    setLoading(false);
                    // 2) Background revalidate (will auto-refresh access token if needed)
                } else {
                    console.log('naw', cached)

                    if (cached?.epccId) {
                        console.log('id', cached?.epccId)

                        const rsvps = await AuthAPI.userRsvps(cached?.epccId)
                        console.log('ids', rsvps)

                        const ids = rsvps.userRsvps.map(obj => obj.eventId);
                        console.log('ids', ids)

                        queryClient.setQueryData(userKeys.rsvps(cached?.epccId), ids);
                        setUserRsvps(ids)

                    }
                }
                return
            }



            // 3) No cache → fetch /me (interceptor handles refresh if access expired)
            try {
                const me = await AuthAPI.me();
                setUser(me);
                queryClient.setQueryData(userKeys.me, me);

                // prefetch RSVPs now that we know the epccId
                if (me?.epccId) {
                    const rsvps = await queryClient.ensureQueryData({
                        queryKey: userKeys.rsvps(me.epccId),
                        queryFn: () => AuthAPI.userRsvps(me.epccId),
                    });
                    const ids = rsvps.map(obj => obj.eventId);
                    setUserRsvps(ids)

                }
            } catch {
                tokenStore.clear();
                clearPersistedQueryCache();
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const doLogin: AuthCtx["login"] = async (i, opts) => {
        const { accessToken } = await AuthAPI.login(i);
        tokenStore.set(accessToken, opts);
        setToken(accessToken);

        const me = await AuthAPI.me();
        queryClient.setQueryData(userKeys.me, me);
        setUser(me);

        if (me?.epccId) {
            queryClient.prefetchQuery({
                queryKey: userKeys.rsvps(me.epccId),
                queryFn: () => AuthAPI.userRsvps(me.epccId),
            });
        }
        if (me?.epccId) navigate(`/profile/${me.epccId}`, { replace: true });
    };

    const doLogout = async () => {
        try { await AuthAPI.logout(); } finally {
            tokenStore.clear();
            setToken(null);
            setUser(null);
            queryClient.removeQueries({ queryKey: userKeys.me });
            clearPersistedQueryCache();
            navigate("/auth", { replace: true });
        }
    };

    const value = useMemo(
        () => ({ user, userRsvps, token, login: doLogin, logout: doLogout, ready: !loading }),
        [user, userRsvps, token, loading]
    );

    if (loading) return <p>Loading…</p>;
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
    const v = useContext(Ctx);
    if (!v) throw new Error("useAuth must be used within AuthProvider");
    return v;
}
