import { isAxiosError } from "axios";
import { logger } from "@/lib/logger";
// Generic API wrapper
export async function apiCall<T>(context: string, fn: () => Promise<{ data: T }>): Promise<T> {
    try {
        const { data } = await fn();
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error.response?.status;   // <-- fixed: must use response
            const message = error.response?.data?.message ?? "Request failed";

            logger.warn(`API call failed [${context}]`, { errCode, message });
            throw new Error(message);
        }

        logger.error(`Unknown API error [${context}]`, { error });
        throw new Error("Unknown error occurred");
    }
}
