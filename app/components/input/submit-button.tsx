import React from 'react'
import { useFormContext, type FieldValues } from "react-hook-form";
import { Button, type ShadcnButtonProps } from '../primitives/button';

type SubmitButtonProps = ShadcnButtonProps & {
    children: string,
    className?: string
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
    const { formState } = useFormContext<FieldValues>();

    const { isSubmitting, isDirty, isValid, isReady } = formState

    return (
        <Button type='submit' className={className} {...props}>
            {isSubmitting ? 'Please wait...' : children}
        </Button>
    )
}
