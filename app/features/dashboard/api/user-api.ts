import { API } from "@/lib/client";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

export type Me = { id: string; epccId: string; username?: string; email?: string; isAdmin: boolean };
export type Rsvp = { eventId: string; rsvpDate?: string };
import type { User } from "@/features/auth/types/user";

export async function getUser(fields?: string[]) {
    const { data } = await API.get<User>(
        "/auth/users/me",
        {
            params: fields ? { fields: fields.join(",") } : {}
        }
    );
    return data;
}