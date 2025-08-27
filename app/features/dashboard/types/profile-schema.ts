import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty").max(80, "cannot be more than 80 characters"),
    lastName: z.string().min(1, "Last name cannot be empty"),
    course: z.string(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>;
