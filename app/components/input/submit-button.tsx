import React from 'react'
import { useFormContext, type FieldValues } from "react-hook-form";
import { Button } from '../primitives/button';

type SubmitButtonProps = {
    children: string,
    className?: string
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
    const { formState } = useFormContext<FieldValues>();

    const { isSubmitting, isDirty, isValid, isReady } = formState

    return (
        <Button type='submit' className={className}>
            {isSubmitting ? 'Please wait...' : children}
        </Button>
    )
}
