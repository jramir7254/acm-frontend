import { PrivateApi, PUBLIC_API } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";
import { apiCall } from "@/services/api/backend";

export type LoginInput = { epccId: string; password: string };
export type RegisterInput = { epccId: string; email: string; password: string };
export type LoginResponse = { accessToken: string; expiresIn: number, epccId: string };
export type RegisterResponse = { token: string };

export type Purpose = 'verify' | 'reset'


export async function login(payload: LoginInput): Promise<LoginResponse> {
    try {

        logger.debug('login payload:', payload)
        const { data } = await PUBLIC_API.post<LoginResponse>("/auth/login", payload);
        logger.success('login response:', data)
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
        logger.success('register response:', data)
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


export async function reset(payload: RegisterInput): Promise<RegisterResponse> {
    try {
        logger.debug('reset payload:', payload)
        const { data } = await PrivateApi.post<RegisterResponse>("/auth/reset", payload);
        logger.success('reset response:', data)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to reset user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to reset user", { error })
        throw new Error("Unknown error occurred during reset");
    }
}

export async function forgot(payload: RegisterInput): Promise<RegisterResponse> {
    try {
        logger.debug('forgot payload:', payload)
        const { data } = await PUBLIC_API.post<RegisterResponse>("/auth/forgot", payload);
        logger.success('forgot response:', data)
        return data;

    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to forgot user: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to forgot user", { error })
        throw new Error("Unknown error occurred during reset");
    }
}




export async function verifyEmail(payload: { token: string; code: string, purpose: Purpose }): Promise<LoginResponse> {
    try {
        logger.debug('verify email payload:', payload)
        const { data } = await PUBLIC_API.post<LoginResponse>("/auth/verify-email", payload);
        logger.success('verify email response:', data)
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
        const { data } = await PrivateApi.get<{ role: string, permissions: string[] }>("/auth/role");
        logger.success('get permissions response:', data)
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

