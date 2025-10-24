import { isAxiosError } from "axios";
import { logger, setCorrelationId } from "@/lib/logger";
import { PrivateApi } from "@/services/api";


export type RootRoutes = 'events' | 'users' | 'auth' | 'admin' | 'public' | ''
export type HttpMethods = 'get' | 'post' | 'delete' | 'patch' | 'put'

export interface BaseBackendResponse { message: string, success: boolean }

export interface ApiError {
    success: boolean;
    message: string;
    code: string;
}

export type CallParams = { root: RootRoutes, route?: string, payload?: any }



export const backend = {
    get: ({ root, route = '', payload }: CallParams) => apiCall('get', root, route, payload),
    post: ({ root, route = '', payload }: CallParams) => apiCall('post', root, route, payload),
    delete: ({ root, route = '', payload }: CallParams) => apiCall('delete', root, route, payload),
    put: ({ root, route = '', payload }: CallParams) => apiCall('put', root, route, payload),
    patch: ({ root, route = '', payload }: CallParams) => apiCall('patch', root, route, payload),
}


// Generic API wrapper
export async function apiCall<T>(method: HttpMethods, root: string, route?: string, payload?: any): Promise<T> {
    try {
        setCorrelationId(`${root}${route}`)
        logger.debug(`REQ: ${method} /${root}${route}`, { payload })
        const { data } = await PrivateApi[method]<T>(`/${root}${route}`, payload);
        logger.debug(`RES: ${method} /${root}${route}`, { data })
        return data;
    } catch (err: any) {
        logger.error('RAW ERR:', err)
        const error: ApiError = err.response?.data || {
            success: false,
            message: "Unknown error",
            code: "UNKNOWN",
        }
        logger.error('NORM ERR:', error)

        return Promise.reject(error)
    }
}
