import axios, { type AxiosInstance, isAxiosError } from "axios";
import { logger } from "@/lib/logger";

const BASE_URL = import.meta.env.VITE_API_URL;

export const PUBLIC_API: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
});

export type Courses = {
    instructorFirstName: string
    instructorLastName: string
    title: string
    subject: string
    courseNumber: string
    name: string
}


export const getCourses = async () => {
    try {
        logger.startProcess('GET COURSES')
        const { data } = await PUBLIC_API.get<Courses[]>(`/public/courses`);
        logger.debug('get courses response:', data)
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            const errCode = error?.status
            const message = error?.response?.data?.message
            logger.warn("Failed to get courses: ", { errCode, message })
            throw message
        }

        logger.error("Error trying to get courses", { error })
        throw new Error("Unknown error occurred during API call");
    } finally { logger.endProcess() }
}
