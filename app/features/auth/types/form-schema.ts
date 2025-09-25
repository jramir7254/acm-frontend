import { z } from 'zod'

export function isDev() {
    const isDev: boolean =
        typeof import.meta !== 'undefined' &&
        (import.meta as any)?.env &&
        Boolean((import.meta as any).env.DEV);

    return isDev
}


export type AuthFormData = {
    epccId: string;
    email?: string;
    password: string;
    passwordConfirmed?: string;
};


export const AuthFormSchema = z.object({
    epccId: z
        .string()
        .min(8, "Cannot be empty")
        .max(8, "Only 8 numbers")
        .startsWith("888", { message: "Must be valid" }),
    email: z.email("Must be a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmed: z.string(),
})
    .refine((data) => data.password === data.passwordConfirmed, {
        message: "Passwords do not match",
        path: ["passwordConfirmed"], // attach error to confirmation field
    });

const epccId = z.string().min(8, 'Cannot be empty').max(8, 'Cannot be more than 8 digits').regex(/^\d+$/).startsWith("8", { message: "Must be valid epcc id number" });
const email = isDev() ? z.email().min(0, "Email cannot be empty") : z.email({ error: "Must be a valid epcc email", pattern: /^[a-zA-Z0-9._%+-]+@(my\.)?\bepcc\b\.edu$/ }).min(0, "Email cannot be empty")
// const email = 
const password = z.string().min(8, "Password must be at least 8 characters")


export const loginSchema = z.object({
    epccId,
    password: z.string(),
});

export const registerSchema = z.object({
    epccId,
    email,
    password,
    passwordConfirmed: z.string(),
}).refine(d => d.password === d.passwordConfirmed, {
    message: "Passwords do not match",
    path: ["passwordConfirmed"],
});

export type AuthFormValues = z.infer<typeof AuthFormSchema>;
