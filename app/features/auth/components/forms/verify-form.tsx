// features/auth/pages/verify-page.tsx

import { useSearchParams } from "react-router";
import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, OtpInput } from '@/components/input'

import { useAppNavigation } from "@/hooks/use-navigation";
import { useAuth } from "../../hooks/use-auth";
import type { Purpose } from "../../api/auth-api";

export default function VerifyForm() {
    const [sp] = useSearchParams();
    const token = sp.get("token");
    const purpose = sp.get('purpose') as Purpose
    const { toDashboard, toAuth } = useAppNavigation()
    const { verify } = useAuth()

    const FormSchema = z.object({
        otp: z.string().min(6, {
            message: "Your one-time password must be 6 characters.",
        }),
    });


    const onSubmit = async ({ otp }: { otp: string }) => {
        if (!token) {
            toast.error("Missing token in URL. Please use the link sent to your email.");
            return;
        }
        try {

            const epccId = await verify({ token, code: otp, purpose });

            if (purpose === 'verify') {
                toDashboard(epccId)
                return
            }


            if (purpose === 'reset') {
                toAuth('reset')
                return
            }



        } catch (err: any) {
            const msg = err ?? "Verification failed";
            // toast.error(msg);
            throw msg
        }
    };

    return (

        <Form onSubmit={onSubmit} schema={FormSchema} defaultValues={{ otp: "" }} className="w-fit">
            <div className="mb-10 space-y-2">
                <h2 className="md:text-3xl font-semibold">Verify your account</h2>
                <p className="text-muted-foreground">
                    Check your inbox and enter the 6-digit code to verify your account.
                </p>
            </div>
            <OtpInput name='otp' label='Verification Code' className="p-5 md:p-8 md:text-lg" length={6} groups={2} />
            <SubmitButton className="mt-3 w-full md:w-auto">
                Submit
            </SubmitButton>
        </Form>

    );
}
