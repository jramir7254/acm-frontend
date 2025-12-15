// features/auth/pages/verify-page.tsx

import { useSearchParams } from "react-router";
import { toast } from "sonner"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/primitives/input-otp"
import { useAuthActions, type Purpose } from "../../hooks/use-auth";
import { Field, FieldError, FieldLabel } from "@/components/primitives/field";
import { Button } from "@/components/primitives/button";



const formSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});


export function VerifyForm() {
    const [sp] = useSearchParams();
    const token = sp.get("token");
    const purpose = sp.get('purpose') as Purpose
    const { mutateAsync } = useAuthActions();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })

    const onSubmit = async ({ otp }: { otp: string }) => {
        if (!token) {
            toast.error("Missing token in URL. Please use the link sent to your email.");
            return;
        }
        try {
            await mutateAsync({ mode: 'verify', data: { code: otp, token, purpose } })
        } catch (err: any) {
            form.setError('root', {
                type: 'server',
                message: 'msg'
            })
        }
    };


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit">
            <div className="mb-10 space-y-2">
                <h2 className="md:text-3xl font-semibold">Verify your account</h2>
                <p className="text-muted-foreground">
                    Check your inbox and enter the 6-digit code to verify your account.
                </p>
            </div>
            <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                            Your one-time password
                        </FieldLabel>
                        <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                {[0, 1, 2].map(n => (
                                    <InputOTPSlot
                                        key={`otp-[${n}]`}
                                        index={n}
                                        className={`
                                            p-5 md:p-8 md:text-lg 
                                            ${form.formState.errors.root ? 'border-red-900 text-red-700 animate-shake' : ''}
                                        `}
                                    />
                                ))}

                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                {[3, 4, 5].map(n => (
                                    <InputOTPSlot
                                        key={`otp-[${n}]`}
                                        index={n}
                                        className={`
                                            p-5 md:p-8 md:text-lg 
                                            ${form.formState.errors.root ? 'border-red-900 text-red-700 animate-shake' : ''}
                                        `}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Button type="submit" className="mt-3 w-full md:w-auto">
                Submit
            </Button>
        </form>
    )
}