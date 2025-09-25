// select-input.tsx
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/primitives/select"
import { cn } from "@/lib/utils"
import type { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"
import { FormInput, type FormInputProps } from "./form-input"

export type SelectInputValues = Array<{ id: string, name: string }>

type SelectInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    className?: string
    placeholder?: string
    label?: string
    values: SelectInputValues
    field: ControllerRenderProps<TFieldValues, TName>
}


export function SelectInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    name,
    label,
    values,
    placeholder,
    ...props
}: {
    name: TName;
    label: string;
    values: Array<{ id: string, name: string }>
    placeholder?: string;
} & Omit<FormInputProps<TFieldValues, TName>, "children">) {
    return (
        <FormInput<TFieldValues, TName> name={name} label={label} {...props}>
            {(field) => (
                <SelectInputInner<TFieldValues, TName>
                    {...props}
                    placeholder={placeholder}
                    label={label}
                    values={values}
                    field={field}
                />
            )}
        </FormInput>
    );
}


/**
 * @todo Be able to add groups
 * @param param0 
 * @returns 
 */
export function SelectInputInner<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    className,
    placeholder,
    label,
    values,
    field
}: SelectInputProps<TFieldValues, TName>) {

    return (
        <Select disabled={field.disabled} onValueChange={field.onChange} value={field.value ?? ''}>
            <SelectTrigger className={cn("w-[180px]", className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {values.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
