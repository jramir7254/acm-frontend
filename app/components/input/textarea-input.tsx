import React from 'react'
import { FormInput, type FormInputProps } from "./form-input";
import { Textarea } from '../primitives/textarea';


export function TextAreaInput({ name, label }: { name: string, label: string }) {
    return (
        <FormInput name={name} label={label}>
            {(field) => <Textarea className="resize-none h-[15vh]" {...field} />}
        </FormInput>)
}
