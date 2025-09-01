import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { FormInput, type FormInputProps } from "./form-input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/primitives/input-otp"
import React from 'react'




type OtpInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
    Omit<FormInputProps<TFieldValues, TName>, "children"> & {
        length: number,
        groups: number

    }

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export function OtpInput<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control: controlProp,
    name,
    label,
    length,
    groups,
    placeholder,
    className,
    ...props
}: OtpInputProps<TFieldValues, TName>) {
    // divide slots evenly into groups
    const { formState, clearErrors } = useFormContext<FieldValues>();

    const groupSize = Math.ceil(length / groups);
    const slotIndexes = Array.from({ length }, (_, i) => i);
    const grouped = chunkArray(slotIndexes, groupSize);

    const error = formState?.errors?.root?.message ?? null


    return (
        <FormInput name={name} label={label}>
            {(field) => (
                <InputOTP maxLength={length}  {...field} >
                    {grouped.map((group, gi) => (
                        <div key={gi} className="flex items-center">
                            <InputOTPGroup>
                                {group.map((slotIndex) => (
                                    <InputOTPSlot key={slotIndex} index={slotIndex} className={error ? 'border-red-900 text-red-700' : ''} />
                                ))}
                            </InputOTPGroup>
                            {gi < grouped.length - 1 && (
                                <InputOTPSeparator />
                            )}
                        </div>
                    ))}
                </InputOTP>
            )}
        </FormInput>
    );
}