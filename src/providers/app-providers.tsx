import { AuthQueryDefaults } from "./query-default";
import { Toaster } from "@/components/primitives/sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WithPersistedQueryClient } from "@/providers/query-client";

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <WithPersistedQueryClient>
            <AuthQueryDefaults />
            {children}
            <Toaster position="top-center" />
            <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
        </WithPersistedQueryClient>
    )
}
