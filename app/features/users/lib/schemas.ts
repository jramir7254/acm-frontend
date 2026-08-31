import z from 'zod';


export const userIdentifiersSchema = z.object({
    epccId: z.string().min(8).max(8),
    epccEmail: z.email()
})

export const userNamesSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty").max(80, "cannot be more than 80 characters"),
    lastName: z.string().min(1, "Last name cannot be empty").max(80, "cannot be more than 80 characters"),
})


export const userCoursesSchema = z.object({
    courses: z.array(z.any()).min(1, "Must select an option")

})

export const profileSchema = (admin: boolean) => z.object({
    ...(admin && { epccId: z.string().min(8).max(8), epccEmail: z.email() }),
    firstName: z.string().min(1, "First name cannot be empty").max(80, "cannot be more than 80 characters"),
    lastName: z.string().min(1, "Last name cannot be empty").max(80, "cannot be more than 80 characters"),
    courses: z.array(z.any()).min(1, "Must select an option"),
})