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

type FormInputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    control?: Control<TFieldValues>;
    name: TName;
    label: string;
    placeholder?: string;
    defaultValue?: any,
    type?: string,
    /**
     * Render prop to customize the control.
     * Receives the `field` from RHF so you can bind value/onChange/etc.
     */
    children?: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
    className?: string
};


export function FormInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    control: controlProp,
    name,
    label,
    placeholder,
    className,
    type,
    children,
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
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {children ? (
                            children({ ...field, disabled })       // pass disabled to render prop
                        ) : (
                            <Input type={type} placeholder={placeholder} disabled={disabled} {...field} />
                        )}
                    </FormControl>
                    <StableFormMessage />
                </FormItem>
            )}
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