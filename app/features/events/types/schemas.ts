import { z } from "zod"
import { loadsAsImage } from "../utils/image-utils"

const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)

export const imageUrlSchemaClient = z
    .url("Must be a valid URL")
    .max(300, "URL must be less than 300 characters")
    .refine(async (url) => await loadsAsImage(url), {
        message: "URL could not be loaded as an image",
    })

/**
 * If your form sends ISO strings for dates, use z.coerce.date().
 * If it already provides Date objects, keep z.date().
 */
const dateField = z.date()

export const eventSchema = z
    .object({
        title: z
            .string()
            .min(1, "Title cannot be empty")
            .max(80, "Title cannot be more than 80 characters"),
        host: z.string().min(1, "cannot be empty"),
        imageUrl: imageUrlSchemaClient,
        location: z.string().min(1, "Location cannot be empty"),

        // Replaced `date` + `time` with two DateTimes
        startAt: dateField.min(startOfToday, "Start cannot be earlier than today"),
        endAt: dateField.min(startOfToday, "End cannot be earlier than today"),

        description: z
            .string()
            .min(1, "Description cannot be empty")
            .max(500, "Cannot be more than 500 characters"),
    })
    .superRefine((data, ctx) => {
        const now = new Date()

        // If start is today, enforce "not before now"
        const isStartToday = data.startAt.toDateString() === now.toDateString()
        if (isStartToday && data.startAt.getTime() < now.getTime()) {
            ctx.addIssue({
                code: 'custom',
                path: ["startAt"],
                message: "Start time cannot be earlier than the current time",
            })
        }

        // endAt must be strictly after startAt
        if (data.endAt.getTime() <= data.startAt.getTime()) {
            ctx.addIssue({
                code: 'custom',
                path: ["endAt"],
                message: "End must be after start",
            })
        }
    })

export type EventFormValues = z.infer<typeof eventSchema>
