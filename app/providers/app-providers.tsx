import { AuthQueryDefaults } from "./query-default";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WithPersistedQueryClient } from "@/providers/query-client";
import { TooltipProvider } from "@/components/ui/tooltip"


export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <WithPersistedQueryClient>
            <AuthQueryDefaults />
            <TooltipProvider>
                {children}
                <Toaster position="top-center" />
            </TooltipProvider>

            <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
        </WithPersistedQueryClient>
    )
}
