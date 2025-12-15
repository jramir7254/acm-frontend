// features/auth/components/auth-form.tsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { authSchemas } from "../../types/form-schema";
import { useAuthActions } from "../../hooks/use-auth";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logger } from "@/lib/logger";
import type z from "zod";

import { Field, FieldError, FieldLabel } from "@/components/primitives/field";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
type Mode = "login" | "register" | 'reset' | 'forgot'



export function AuthForm() {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useAuthActions();
    const [searchParams] = useSearchParams();
    const mode = (searchParams.get("type") as Mode) ?? "login";

    const currentSchema = authSchemas[mode] as typeof authSchemas[Mode];



    const form = useForm<z.infer<typeof currentSchema>>({
        resolver: zodResolver(currentSchema),
        defaultValues: {
            epccId: '',
            epccEmail: '',
            password: '',
            passwordConfirmed: ''
        },
        shouldUnregister: true,
        mode: 'onSubmit',
    })


    useEffect(() => {
        form.reset({
            epccId: '',
            epccEmail: '',
            password: '',
            passwordConfirmed: ''
        })
        form.clearErrors()
    }, [mode])


    const setType = (next: Mode) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("type", next);
        navigate(`/auth?${sp.toString()}`, { replace: true });
    };

    const onSubmit = async (vals: z.infer<typeof currentSchema>) => {

        try {
            logger.debug({ mode, vals })
            await mutateAsync({
                mode,
                data: vals
            })
        } catch (err: any) {
            logger.debug('form error', err)
            form.setError("root", {
                type: "server",
                message:
                    err?.message || err || "An unexpected error occurred. Please try again.",
            });
        }

    }


    const isLogin = mode === 'login'
    const isForgot = mode === 'forgot'
    const isReset = mode === 'reset'

    type FieldName = 'epccId' | 'epccEmail' | 'password' | 'passwordConfirmed';

    const fields: Array<{
        type: string,
        name: FieldName,
        label: string,
        placeholder: string,
        hidden: boolean
    }> = [
            {
                type: 'text',
                name: 'epccId',
                label: 'EPCC ID',
                placeholder: '888XXXXX',
                hidden: isReset
            },
            {
                type: 'email',
                name: 'epccEmail',
                label: 'EPCC Email',
                placeholder: 'johndoe@my.epcc.edu',
                hidden: isLogin || isReset
            },
            {
                type: 'password',
                name: 'password',
                label: 'Password',
                placeholder: '••••••••',
                hidden: isForgot
            },
            {
                type: 'password',
                name: 'passwordConfirmed',
                label: 'Confirm Password',
                placeholder: '••••••••',
                hidden: isLogin || isForgot
            },
        ]

    const error = form.formState?.errors?.root?.message ?? null


    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {fields.map(f => (
                !f.hidden &&
                <Controller
                    key={f.name}
                    name={f.name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={f.name}>
                                {f.label}
                            </FieldLabel>
                            <Input
                                type={f.type}
                                placeholder={f.placeholder}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            ))}

            {error &&
                <p className="text-red-700 animate-shake">{error}</p>
            }

            <p>
                {isLogin ? "Don't" : 'Already'} have an account?{" "}
                <button
                    type="button"
                    onClick={() => setType(isLogin ? "register" : 'login')}
                    className="text-blue-400 underline cursor-pointer"
                >
                    {isLogin ? 'Sign Up Here!' : 'Sign In Here!'}
                </button>
            </p>

            {isLogin && (
                <p
                    className="cursor-pointer text-muted-foreground hover:text-gray-400 hover:underline"
                    onClick={() => setType('forgot')}
                >
                    Forgot your password?
                </p>

            )}


            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Please wait...' : isLogin ? "Sign in" : isForgot || isReset ? "Reset Password" : "Create account"}
            </Button>
        </form>
    )
}