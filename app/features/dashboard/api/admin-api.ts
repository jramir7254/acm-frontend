import { PrivateApi } from "@/services/api";
import { logger } from "@/lib/logger";
import { isAxiosError } from "axios";

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