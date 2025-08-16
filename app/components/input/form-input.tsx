import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/primitives/form";
import { Input } from "../primitives/input";

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
    control: Control<TFieldValues>;
    name: TName;
    label: string;
    placeholder?: string;
    defaultValue?: any,
    /**
     * Render prop to customize the control.
     * Receives the `field` from RHF so you can bind value/onChange/etc.
     */
    children?: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
};

export default function FormInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    control,
    name,
    label,
    placeholder,
    defaultValue,
    children,
}: FormInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {children ? (
                            children(field)
                        ) : (
                            <Input defaultValue={defaultValue} placeholder={placeholder} {...field} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
