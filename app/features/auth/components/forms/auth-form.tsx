// features/auth/components/auth-form.tsx
import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";

import { FormInput, Form, SubmitButton, GlobalFormError } from "@/components/input";
import { type AuthFormValues, loginSchema, registerSchema, forgotSchema, resetSchema } from "../../types/form-schema";
import { useAuth } from "../../hooks/use-auth";
import { useAppNavigation } from "@/hooks/use-navigation";
import { FeatureFlag } from "@/components/layout";
import { toast } from "sonner";

type Mode = "login" | "register" | 'reset' | 'forgot'
export default function AuthForm() {
    const navigate = useNavigate();
    const { login, register, forgot, reset } = useAuth();
    const [searchParams] = useSearchParams();
    const { toVerify, toDashboard } = useAppNavigation()

    const type = (searchParams.get("type") as Mode) ?? "login";

    const resolverSchema = useMemo(
        () => {
            if (type === "register") return registerSchema
            if (type === "login") return loginSchema
            if (type === "forgot") return forgotSchema
            if (type === "reset") return resetSchema
        },
        [type]
    );


    const formOptions = {
        defaultValues: {
            epccId: "",
            email: "",
            password: "",
            passwordConfirmed: "",
        },
        mode: "onSubmit",
        shouldUnregister: true,
    }



    const setType = (next: Mode) => {
        const sp = new URLSearchParams(searchParams);
        sp.set("type", next);
        navigate(`/auth?${sp.toString()}`, { replace: true });
    };

    const onSubmit = async (values: any) => {
        try {
            if (type === "login") {
                const epccId = await login(
                    { epccId: values.epccId, password: values.password },
                );
                toDashboard(epccId)
            }
            if (type === "register") {
                const { token } = await register(
                    { epccId: values.epccId, email: values.email, password: values.password },
                );

                toVerify(token, 'verify')
            }

            if (type === "forgot") {
                const { token } = await forgot(
                    { epccId: values.epccId, email: values.email },
                );

                toVerify(token, 'reset')
                return
            }


            if (type === "reset") {
                const epccId = await reset(
                    values.password
                );

                toast.success('Password Reset Succesfully')
                toDashboard(epccId)

            }
        } catch (error: any) {
            const msg = error?.message ?? String(error);
            throw msg
        }
    };


    const isLogin = type === 'login'
    const isForgot = type === 'forgot'
    const isReset = type === 'reset'

    return (
        <Form onSubmit={onSubmit} resetOn={[type]} schema={resolverSchema} {...formOptions} className="flex flex-col gap-5">

            <FormInput name="epccId" label="EPCC ID" placeholder="888XXXXX" hidden={isReset} />
            <FormInput name="email" label="EPCC Email" placeholder="johndoe@my.epcc.edu" hidden={isLogin || isReset} />
            <FormInput type="password" name="password" label="Password" placeholder="••••••••" hidden={isForgot} />
            <FormInput type="password" name="passwordConfirmed" placeholder="••••••••" label="Confirm Password" hidden={isLogin || isForgot} />

            <GlobalFormError />

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

            <FeatureFlag ready>
                {isLogin && <p className="cursor-pointer text-muted-foreground hover:text-gray-400 hover:underline " onClick={() => setType('forgot')}>Forgot your password?</p>}
            </FeatureFlag>


            <SubmitButton >
                {isLogin ? "Sign in" : isForgot || isReset ? "Reset Password" : "Create account"}
            </SubmitButton>
        </Form>
    );
}
