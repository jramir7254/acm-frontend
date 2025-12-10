import { userKeys } from "@/features/dashboard/hooks/use-user";
import { usersKeys } from "@/features/dashboard/hooks/use-admin";
import { eventKeys } from "@/features/events/hooks/event-keys";

export type QueryKeys =
    readonly typeof userKeys[] |
    readonly typeof eventKeys[] |
    readonly typeof usersKeys[]