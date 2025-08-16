import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// Export these for use in root and logout cleanup
export const PERSIST_KEY = "rq-cache:v1"; // bump when you need to invalidate persisted cache

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,   // treat as fresh for 5 min (tune as you like)
            gcTime: 24 * 60 * 60 * 1000, // keep cached data up to 24h unused
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: { retry: 0 },
    },
});

export const persister = createAsyncStoragePersister({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    key: PERSIST_KEY,
    throttleTime: 1000,
});

// Helper to nuke persisted cache on logout or auth changes
export function clearPersistedQueryCache() {
    try {
        if (typeof window !== "undefined") localStorage.removeItem(PERSIST_KEY);
    } catch {

    }
}


type WithPersistedQueryClientProps = {
    children: React.ReactNode;
};

export function WithPersistedQueryClient({ children }: WithPersistedQueryClientProps) {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: 24 * 60 * 60 * 1000,
                buster: "user-v1",
            }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}

