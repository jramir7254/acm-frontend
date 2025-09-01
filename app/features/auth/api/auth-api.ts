import { PRIVATE_API, PUBLIC_API } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

export type LoginInput = { epccId: string; password: string };
export type RegisterInput = { epccId: string; email: string; password: string };
export type LoginResponse = { accessToken: string; expiresIn: number, epccId: string };
export type RegisterResponse = { token: string };



export async function login(payload: LoginInput): Promise<LoginResponse> {
    try {

        logger.debug('login payload:', payload)
        const { data } = await PUBLIC_API.post<LoginResponse>("/auth/login", payload);
        logger.debug('login response:', data)
        return data; // { accessToken, expiresIn }

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to log in user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to log in user", { error })
        throw new Error("Unknown error occurred during login");
    }
}




export async function register(payload: RegisterInput): Promise<RegisterResponse> {
    try {
        logger.debug('register payload:', payload)
        const { data } = await PUBLIC_API.post<RegisterResponse>("/auth/register", payload);
        logger.debug('register response:', data)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to register user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to register user", { error })
        throw new Error("Unknown error occurred during registration");
    }
}




export async function verifyEmail(payload: { token: string; code: string }): Promise<LoginResponse> {
    try {
        logger.debug('verify email payload:', payload)
        const { data } = await PUBLIC_API.post<LoginResponse>("/auth/verify-email", payload);
        logger.debug('verify email response:', data)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to verify user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to verify user", { error })
        throw new Error("Unknown error occurred during verification");
    }
}




export async function getPermissions(): Promise<{ role: string, permissions: string[] }> {
    try {
        logger.startProcess('ROLE')
        const { data } = await PRIVATE_API.get<{ role: string, permissions: string[] }>("/auth/role");
        logger.debug('get permissions response:', data)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to get user role and permissions: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to get user role and permissions:", { error })
        throw new Error("Unknown error occurred during auth check");
    } finally { logger.endProcess() }
}






export async function logout(): Promise<{ message: string; }> {
    try {
        const { data } = await PUBLIC_API.post("/auth/logout");
        logger.debug('logout response:', data.message)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to logout user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to logout user", { error })
        throw new Error("Unknown error occurred during logout");
    }
}

