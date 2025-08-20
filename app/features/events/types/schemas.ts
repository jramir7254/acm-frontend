import { z } from "zod";
import { loadsAsImage } from "../utils/image-utils";
const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);



type EventFormValues = z.infer<typeof eventSchema>;

export const imageUrlSchemaClient = z
    .url("Must be a valid URL")
    .max(300, "URL must be less than 300 characters")
    .refine(async (url) => await loadsAsImage(url), {
        message: "URL could not be loaded as an image",
    });


export const eventSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").max(80, "Title cannot be more than 80 characters"),
    host: z.string().min(1, "cannot be empty"),
    imageUrl: imageUrlSchemaClient,
    location: z.string().min(1, "Location cannot be empty"),
    date: z.date().min(startOfToday, "Date cannot be earlier than today"),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM, 24h)" }),
    description: z.string().min(1, "Description cannot be empty").max(500, "Cannot be more than 500 characters")
});

