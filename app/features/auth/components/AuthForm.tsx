import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Button } from "@heroui/react";
import { useAuth } from "@/features/auth/context/AuthContext";

type Mode = "login" | "register";
type FormData = {
    epccId: string;
    email?: string;
    password: string;
    passwordConfirmed?: string;
};

export default function AuthForm() {
    const [mode, setMode] = useState<Mode>("login");
    const { login, register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: { epccId: "", email: "", password: "", passwordConfirmed: "" },
        shouldUnregister: true,
    });

    const onSubmit = async (data: FormData) => {
        if (mode === "login") {
            await login({ epccId: data.epccId, password: data.password }, { persist: "local" });
            return;
        }
        await registerUser(
            { epccId: data.epccId, email: data.email!, password: data.password },
            { persist: "local" }
        );
    };

    const pwd = watch("password");

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Button variant={mode === "login" ? "solid" : "flat"} onPress={() => { setMode("login"); clearErrors(); reset(); }}>
                    Log in
                </Button>
                <Button variant={mode === "register" ? "solid" : "flat"} onPress={() => { setMode("register"); clearErrors(); reset(); }}>
                    Register
                </Button>
            </div>

            <Form
                aria-label={mode === "login" ? "Log in" : "Register"}
                onSubmit={(e) => { e.preventDefault(); void handleSubmit(onSubmit)(); }}
            >
                <Input
                    label="EPCC ID"
                    isRequired
                    {...register("epccId", { required: "EPCC ID is required" })}
                    isInvalid={!!errors.epccId}
                    errorMessage={errors.epccId?.message}
                />

                {mode === "register" && (
                    <Input
                        label="Email"
                        type="email"
                        isRequired
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                        })}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                )}

                <Input
                    label="Password"
                    type="password"
                    isRequired
                    {...register("password", {
                        required: "Password is required",
                        ...(mode === "register" ? { minLength: { value: 8, message: "At least 8 characters" } } : {}),
                    })}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                />

                {mode === "register" && (
                    <Input
                        label="Confirm password"
                        type="password"
                        isRequired
                        {...register("passwordConfirmed", {
                            required: "Please confirm your password",
                            validate: (val) => val === pwd || "Passwords do not match",
                        })}
                        isInvalid={!!errors.passwordConfirmed}
                        errorMessage={errors.passwordConfirmed?.message}
                    />
                )}

                <Button type="submit" color="primary" isDisabled={isSubmitting}>
                    {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
                </Button>
            </Form>
        </div>
    );
}
