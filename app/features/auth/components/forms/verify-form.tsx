// features/auth/pages/verify-page.tsx

import { useSearchParams } from "react-router";
import { toast } from "sonner"
import { z } from "zod"
import { Form, SubmitButton, OtpInput, GlobalFormError } from '@/components/input'

import { useAppNavigation } from "@/hooks/use-navigation";
import { useAuth } from "../../hooks/use-auth";

export default function VerifyForm() {
    const [sp] = useSearchParams();
    const token = sp.get("token");
    const { toDashboard } = useAppNavigation()
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
            const epccId = await verify({ token, code: otp });
            toDashboard(epccId)
        } catch (err: any) {
            const msg = err ?? "Verification failed";
            toast.error(msg);
        }
    };

    return (

        <Form onSubmit={onSubmit} schema={FormSchema} defaultValues={{ otp: "" }}>
            <h1 className="text-xl font-semibold">Verify your account</h1>
            <OtpInput name='otp' label='One-Time Password' length={6} groups={2} />
            <SubmitButton>
                Submit
            </SubmitButton>
            <GlobalFormError />
        </Form>

    );
}
