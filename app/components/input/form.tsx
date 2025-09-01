import { useEffect } from "react";
import {
    useForm,
    type FieldValues,
    type DefaultValues,
    type SubmitHandler,
    type UseFormProps,
} from "react-hook-form";
import { z, type ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as ShadcnForm } from "../primitives/form";

// Helpers: tie Zod to RHF
type InferInput<TSchema extends ZodType> = z.input<TSchema> & FieldValues; // RHF expects FieldValues

type FormProps<TSchema extends ZodType> = {
    schema: TSchema;
    defaultValues: DefaultValues<InferInput<TSchema>>;
    onSubmit: SubmitHandler<InferInput<TSchema>>;
    resetOn?: unknown[];
    children: React.ReactNode;
    formOptions?: Omit<UseFormProps<InferInput<TSchema>>, "resolver">;
    className?: string
};

export function Form<TSchema extends ZodType>({
    schema,
    defaultValues,
    onSubmit,
    resetOn = [],
    children,
    className,
    ...formOptions   // ✅ flatten all other RHF options (mode, disabled, etc.)
}: FormProps<TSchema>) {
    if (!schema) {
        throw new Error("Form: `schema` prop is required and must be a Zod schema instance.");
    }
    const form = useForm<InferInput<TSchema>>({
        resolver: zodResolver(schema as ZodType<any, any, any>),
        defaultValues,
        ...formOptions,
    });

    useEffect(() => {
        form.clearErrors();
        form.reset();
    }, [...resetOn]);


    useEffect(() => {
        const subscription = form.watch(() => {
            if (form.formState.errors.root) {
                form.clearErrors("root");
            }
        });

        return () => subscription.unsubscribe();
    }, [form]);


    const handleSafeSubmit = async (values: InferInput<TSchema>, e?: any) => {
        try {
            await onSubmit(values, e);
        } catch (err: any) {
            form.setError("root", {
                type: "server",
                message:
                    err?.message || err || "An unexpected error occurred. Please try again.",
            });
        }
    };

    return (
        <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(handleSafeSubmit)} className={className}>
                {children}
            </form>
        </ShadcnForm>
    );
}
