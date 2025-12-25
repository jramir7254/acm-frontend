import { Controller } from "react-hook-form"
import type { ProfileFormValues, ReactProfileForm } from "../form"
import { Field, FieldError, FieldLabel } from "@/components/primitives/field"
import { Input } from "@/components/primitives/input"
import { camelToTitleCase } from "@/lib/utils"

type ExtraFields = 'firstName' | 'lastName' | 'epccId' | 'epccEmail'

export function TextField({ name, form }: ReactProfileForm & { name: ExtraFields }) {

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>
                    <FieldLabel htmlFor={name}>
                        {camelToTitleCase(name)}
                    </FieldLabel>
                    <Input
                        placeholder={camelToTitleCase(name)}
                        id={name}
                        {...field}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}