import React from 'react'
import { useFormContext, type FieldValues } from "react-hook-form";
import { Button } from '../primitives/button';

type SubmitButtonProps = {
    children: string,
    className?: string
}

export function GlobalFormError() {
    const { formState } = useFormContext<FieldValues>();

    const error = formState?.errors?.root?.message ?? null
    return (
        <>
            {error &&
                <p className="text-red-700 animate-shake">{error}</p>
            }

        </>
    )
}
