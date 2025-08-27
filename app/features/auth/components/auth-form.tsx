// features/auth/components/auth-form.tsx
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/input";
import { Form } from "@/components/primitives/form";
import { Button } from "@/components/primitives/button";
import { type AuthFormValues, loginSchema, registerSchema } from "../types/form-schema";
import { useAuthActions } from "../context/AuthP";

type Mode = "login" | "register";

export default function AuthForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const type = (searchParams.get("type") as Mode) ?? "login";
    const { login, register: registerUser } = useAuthActions();

    // Always use a schema that matches AuthFormValues, with conditional validation inside
    const resolverSchema = useMemo(
        () => (type === "register" ? registerSchema : loginSchema),
        [type]
    );
    const form = useForm<typeof resolverSchema>({
        resolver: zodResolver(resolverSchema),
        defaultValues: {
            epccId: "",
            email: "",
            password: "",
            passwordConfirmed: "",
        },
        mode: "onSubmit",
        shouldUnregister: true,
    });

    // Clear errors and reset when mode changes (URL param changed)
    useEffect(() => {
        form.clearErrors();
        form.reset();
    }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

    // Switch URL mode while preserving other params
    const setType = (next: Mode) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("type", next);
        navigate(`/auth?${sp.toString()}`, { replace: true });
    };

    const onSubmit = async (values: AuthFormValues) => {
        try {
            if (type === "login") {
                await login(
                    { epccId: values.epccId, password: values.password },
                    { persist: "local" }
                );
                return;
            }
            if (type === "register") {
                const { token } = await registerUser(
                    { epccId: values.epccId, email: values.email!, password: values.password },
                    { persist: "local" } // you can ignore this for register if not needed
                );

                // Go to verify page whether token exists or not.
                // If your backend *always* returns a token, you can assume it's present.
                if (token) {
                    navigate(`/auth/verify?token=${encodeURIComponent(token)}`);
                } else {
                    navigate(`/auth/verify`); // fallback if you want to allow manual entry
                }
                return;
            }

        } catch (error: any) {
            const msg = error?.message ?? String(error);
            form.setError("root", { message: msg });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">


                <FormInput name="epccId" label="EPCC ID" placeholder="888XXXXX" />
                {type === "register" && (
                    <FormInput name="email" label="EPCC Email" placeholder="johndoe@my.epcc.edu" />
                )}
                <FormInput type="password" name="password" label="Password" placeholder="••••••••" />
                {type === "register" && (
                    <FormInput
                        type="password"
                        name="passwordConfirmed"
                        placeholder="••••••••"
                        label="Confirm Password"
                    />
                )}

                {form.formState.errors.root?.message && (
                    <p className="text-red-700 animate-shake">{form.formState.errors.root.message}</p>
                )}

                {type === "login" && (
                    <p>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setType("register")}
                            className="text-blue-600 underline cursor-pointer"
                        >
                            Sign Up Here!
                        </button>
                    </p>
                )}

                {type === "register" && (
                    <p>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setType("login")}
                            className="text-blue-400 underline cursor-pointer"
                        >
                            Sign In Here!
                        </button>
                    </p>
                )}

                <Button type="submit" color="primary" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Please wait..."
                        : type === "login"
                            ? "Sign in"
                            : "Create account"}
                </Button>
            </form>
        </Form>
    );
}
