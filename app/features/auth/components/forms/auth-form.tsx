// features/auth/components/auth-form.tsx
import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";

import { FormInput, Form, SubmitButton, GlobalFormError } from "@/components/input";
import { type AuthFormValues, loginSchema, registerSchema } from "../../types/form-schema";
import { useAuth } from "../../hooks/use-auth";
import { useAppNavigation } from "@/hooks/use-navigation";

type Mode = "login" | "register";

export default function AuthForm() {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [searchParams] = useSearchParams();
    const { toVerify, toDashboard } = useAppNavigation()

    const type = (searchParams.get("type") as Mode) ?? "login";

    const resolverSchema = useMemo(
        () => (type === "register" ? registerSchema : loginSchema),
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
                    { epccId: values.epccId, email: values.email!, password: values.password },
                );

                toVerify(token)
            }
        } catch (error: any) {
            const msg = error?.message ?? String(error);
            throw msg
        }
    };


    const isLogin = type === 'login'

    return (
        <Form onSubmit={onSubmit} resetOn={[type]} schema={resolverSchema} {...formOptions} className="flex flex-col gap-5">

            <FormInput name="epccId" label="EPCC ID" placeholder="888XXXXX" />
            <FormInput name="email" label="EPCC Email" placeholder="johndoe@my.epcc.edu" hidden={isLogin} />
            <FormInput type="password" name="password" label="Password" placeholder="••••••••" />
            <FormInput type="password" name="passwordConfirmed" placeholder="••••••••" label="Confirm Password" hidden={isLogin} />

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


            <SubmitButton >
                {isLogin ? "Sign in" : "Create account"}
            </SubmitButton>
        </Form>
    );
}
