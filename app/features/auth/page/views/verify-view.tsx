// features/auth/pages/verify-page.tsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/primitives/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/primitives/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/primitives/input-otp";

import * as AuthAPI from "@/features/auth/services/auth";
import { tokenStore } from "@/features/auth/services/token-store";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/features/auth/hooks/useMe";

export default function VerifyPage() {
    const [sp] = useSearchParams();
    const token = sp.get("token");
    const navigate = useNavigate();
    const qc = useQueryClient();

    const FormSchema = z.object({
        otp: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { otp: "" },
    });

    const onSubmit = async ({ otp }: { otp: string }) => {
        if (!token) {
            toast.error("Missing token in URL. Please use the link sent to your email.");
            return;
        }
        try {
            const { accessToken } = await AuthAPI.verifyEmail({ token, code: otp });

            // Store short-lived access token (refresh token is set by server in httpOnly cookie)
            tokenStore.set(accessToken, { persist: "local" });

            // Warm cache: /me then RSVPs
            const me = await qc.fetchQuery({ queryKey: userKeys.me, queryFn: AuthAPI.me });
            if (me?.epccId) {
                qc.prefetchQuery({ queryKey: userKeys.rsvps(me.epccId), queryFn: () => AuthAPI.userRsvps(me.epccId) });
                toast.success("Account verified!");
                navigate(`/profile/${me.epccId}`, { replace: true });
            } else {
                // Fallback if /me didn’t return epccId for some reason
                toast.success("Account verified!");
                navigate("/profile", { replace: true });
            }
        } catch (err: any) {
            const msg = err?.response?.data?.error ?? err?.message ?? "Verification failed";
            toast.error(msg);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <h1 className="text-xl font-semibold">Verify your account</h1>

                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                                {!token && (
                                    <p className="text-red-600">Missing token in URL. Please use the link sent to your email.</p>
                                )}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
