// auth-state.ts
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "@/features/auth/services/token-store";

export function useAuthQueryDefaults() {
    const qc = useQueryClient();
    const isAuthed = !!tokenStore.get();

    useEffect(() => {
        // All queries with keys beginning ["user", ...]
        qc.setQueryDefaults(["user"], {
            enabled: isAuthed,
            staleTime: 60 * 60 * 1000,
            gcTime: 7 * 24 * 60 * 60 * 1000,
            retry: (failCount, err: any) => {
                // don’t keep retrying 401s
                const status = err?.response?.status ?? err?.status;
                return status !== 401 && failCount < 2;
            },
        });

        // If logged out, drop all user-scoped data
        if (!isAuthed) {
            qc.removeQueries({ queryKey: ["user"], exact: false });
        }
    }, [isAuthed, qc]);
}



export function AuthQueryDefaults() {
    useAuthQueryDefaults()

    return <></>
}