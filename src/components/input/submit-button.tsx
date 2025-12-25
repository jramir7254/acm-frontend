import React from 'react'
import { useFormContext, type FieldValues } from "react-hook-form";
import { Button, type ShadcnButtonProps } from '../primitives/button';

type SubmitButtonProps = ShadcnButtonProps & {
    children: string,
    className?: string,
    allowSubmitOn?: {
        isDirty?: boolean,
        isValid?: boolean,
        isReady?: boolean
    }
}

export function SubmitButton({ children, className, allowSubmitOn, ...props }: SubmitButtonProps) {
    const { formState } = useFormContext<FieldValues>();

    const { isSubmitting, isDirty, isValid, isReady } = formState

    // 👇 handle conditions
    const conditions: boolean[] = [];

    if (allowSubmitOn?.isDirty) {
        conditions.push(isDirty);
    }
    if (allowSubmitOn?.isValid) {
        conditions.push(isValid);
    }
    if (allowSubmitOn?.isReady) {
        // `isReady` isn't part of react-hook-form, so you’d need to provide it yourself
        // e.g. via context, props, or computed externally
        // For now let's assume it's false
        conditions.push(false);
    }

    // Button is disabled if any required condition is false OR form is submitting
    const disabled = isSubmitting || (conditions.length > 0 && !conditions.every(Boolean));

    return (
        <Button disabled={disabled} type='submit' className={className} {...props}>
            {isSubmitting ? 'Please wait...' : children}
        </Button>
    )
}
