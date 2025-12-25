import React from 'react'
import { Controller } from 'react-hook-form'
import { CourseSelect } from '@/features/edu/components/course-select'
import { Field } from '@/components/primitives/field'
import { Label } from '@/components/primitives/label'
import { Select, SelectTrigger, SelectValue } from '@/components/primitives/select'
import type { ReactProfileForm } from '../form'

export function CourseField({ form }: ReactProfileForm) {
    return (
        <Controller
            name='course'
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>

                    <Label htmlFor="type">Course</Label>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange} disabled={field.disabled}>
                        <SelectTrigger id='type' className="max-w-fit">
                            <SelectValue placeholder="Select Your Course" />
                        </SelectTrigger>
                        <CourseSelect />
                    </Select>

                </Field>
            )}
        />
    )
}
