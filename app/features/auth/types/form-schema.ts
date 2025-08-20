import { z } from 'zod'

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

const epccId = z.string().min(8).max(8).regex(/^\d+$/).startsWith("888", { message: "Must be valid" });

export const loginSchema = z.object({
    epccId,
    password: z.string(),
});

export const registerSchema = z.object({
    epccId,
    email: z.email("Must be a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmed: z.string(),
}).refine(d => d.password === d.passwordConfirmed, {
    message: "Passwords do not match",
    path: ["passwordConfirmed"],
});

export type AuthFormValues = z.infer<typeof AuthFormSchema>;
