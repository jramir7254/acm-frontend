import { PrivateApi } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";
import type { User } from "./user-api";
import type { Courses } from "@/services/api";

export const addNewCourse = async (newCourse: Courses) => {
    try {
        logger.debug('post course payload', newCourse)
        await PrivateApi.post('/public/courses', { newCourse })
    } catch (error) {
        logger.error(error)
        throw error
    }
}


export const getUsers = async (): Promise<User[]> => {
    try {
        const { data } = await PrivateApi.get('/users/')
        return data
    } catch (error) {
        logger.error(error)
        throw error
    }
}


export const getUser = async (userId: string): Promise<User[]> => {
    try {
        const { data } = await PrivateApi.get(`/users/user/${userId}`)
        return data
    } catch (error) {
        logger.error(error)
        throw error
    }
}


export const getStats = async (): Promise<User[]> => {
    try {
        logger.debug('call made here to stats')

        const { data } = await PrivateApi.get('/events/list')
        logger.debug('call made here to stats', { data })

        return data
    } catch (error) {
        logger.error(error)
        throw error
    }
}