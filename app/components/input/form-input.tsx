import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/primitives/form";
import { Input } from "../primitives/input";
import { useFormContext } from "react-hook-form";

import type {
    Control,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
} from "react-hook-form";


type RenderProp<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
    (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;

export type FormInputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
    control?: Control<TFieldValues>;
    name: TName;
    label: string;
    placeholder?: string;
    defaultValue?: any;
    type?: string;
    children?: React.ReactNode | RenderProp<TFieldValues, TName>;
    className?: string;
};

export function FormInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control: controlProp,
    name,
    label,
    placeholder,
    className,
    type,
    children,
    ...props
}: FormInputProps<TFieldValues, TName>) {
    const ctx = useFormContext<TFieldValues>();
    const control = controlProp ?? ctx?.control;
    const disabled = ctx?.formState?.disabled;   // 🔑 grab from RHF context

    if (!control) {
        throw new Error("FormInput must be used inside a FormProvider (or pass a `control` prop).");
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const handleChange: typeof field.onChange = (e) => {
                    field.onChange(e);
                    ctx.clearErrors?.(name); // clear error for this field
                };

                return (
                    <FormItem className={className} {...props}>
                        <FormLabel className="mb-2">{label}</FormLabel>
                        <FormControl>
                            {typeof children === "function"
                                ? (children as RenderProp<TFieldValues, TName>)({
                                    ...field,
                                    onChange: handleChange,   // ✅ override here
                                    disabled,
                                })
                                : children ?? (
                                    <Input
                                        type={type}
                                        placeholder={placeholder}
                                        disabled={disabled}
                                        {...field}
                                        onChange={handleChange} // ✅ override here
                                    />
                                )}
                        </FormControl>
                        <StableFormMessage />
                    </FormItem>
                );
            }}
        />
    );
}


export function StableFormMessage({ className = "min-h-fit leading-tight" }) {
    return (
        <div className={className}>
            <FormMessage />
        </div>
    )
}