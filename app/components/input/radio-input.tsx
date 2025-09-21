import { FormInput, type FormInputProps } from "./form-input";
import { RadioGroup, RadioGroupItem } from "@/components/primitives/radio-group"







import { cn } from "@/lib/utils"
import type { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"
import { Label } from "../primitives/label";
import { useIsMobile } from "@/hooks";

type SelectInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
    className?: string
    placeholder?: string
    label?: string
    values: Array<{ id: string | number, name: string }>
    field: ControllerRenderProps<TFieldValues, TName>
}


export function RadioInput<
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
    values: Array<{ id: string | number, name: string }>
    placeholder?: string;
} & Omit<FormInputProps<TFieldValues, TName>, "children">) {
    return (
        <FormInput<TFieldValues, TName> name={name} label={label} {...props}>
            {(field) => (
                <RadioInputInner<TFieldValues, TName>
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



export function RadioInputInner<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({
    className,
    values,
    field
}: SelectInputProps<TFieldValues, TName>) {

    const isMobile = useIsMobile()

    const { first, middle, last } = {
        first: values[0].name,
        middle: values[Math.floor(values.length / 2)].name,
        last: values[values.length - 1].name,
    };
    return (
        <>
            {isMobile && (
                <div className="grid grid-cols-5 text-xs w-full text-center">
                    <p className="">{first}</p>
                    <p></p>
                    <p>{middle}</p>
                    <p></p>
                    <p>{last}</p>
                </div>
            )}
            <RadioGroup
                orientation="horizontal"
                className={`flex  ${className ?? ""}`}
                disabled={field.disabled}
                onValueChange={field.onChange}
                value={field.value?.toString() ?? ""}
            >
                {values.map((item) => (
                    <div key={`${item.name}-${item.id}`} className="flex-1 ">
                        <RadioGroupItem
                            id={`${item.name}-${item.id}`}
                            value={String(item.id)}
                            className="peer sr-only" // hide input but keep it focusable
                        />
                        <Label
                            htmlFor={`${item.name}-${item.id}`}
                            className="flex-1 flex justify-center py-3 border rounded-md cursor-pointer 
                   peer-data-[state=checked]:bg-primary 
                   peer-data-[state=checked]:text-primary-foreground"
                        >
                            {isMobile ? item.id : item.name}
                        </Label>
                    </div>

                ))}
            </RadioGroup>
        </>
    )
}
