import { z } from 'zod'
import { IS_DEV } from '@/lib/constants';


const epccId = z.string().
    min(8, 'Cannot be empty').
    max(8, 'Cannot be more than 8 digits').
    regex(/^\d+$/).
    startsWith("8", {
        message: "Must be valid epcc id number"
    });


const epccEmail = IS_DEV ?
    z.email().min(0, "Email cannot be empty")
    :
    z.email({
        error: "Must be a valid epcc email",
        pattern: /^[a-zA-Z0-9._%+-]+@(my\.)?\bepcc\b\.edu$/
    }).min(0, "Email cannot be empty")



const password = z.string().min(8, "Password must be at least 8 characters")


export const authSchemas = {
    login: z.object({
        epccId,
        password: z.string(),
    }),

    forgot: z.object({
        epccId,
        epccEmail
    }),

    reset: z.object({
        password,
        passwordConfirmed: z.string(),
    }).refine(d => d.password === d.passwordConfirmed, {
        message: "Passwords do not match",
        path: ["passwordConfirmed"],
    }),

    register: z.object({
        epccId,
        epccEmail,
        password,
        passwordConfirmed: z.string(),
    }).refine(d => d.password === d.passwordConfirmed, {
        message: "Passwords do not match",
        path: ["passwordConfirmed"],
    })


} as const

