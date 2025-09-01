import { AuthQueryDefaults } from "./query-default";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WithPersistedQueryClient } from "@/providers/query-client";

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <WithPersistedQueryClient>
            <AuthQueryDefaults />
            {children}
            <Toaster richColors position="top-center" />
            <ReactQueryDevtools initialIsOpen={false} />
        </WithPersistedQueryClient>
    )
}
