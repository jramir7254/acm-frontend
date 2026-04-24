import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { EventReactForm } from '..'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { snakeToTitle } from '@/lib/utils'

export function SelectTypeField({ form }: EventReactForm) {

    const eventTypes = [
        'meeting',
        'workshop',
        'external',
    ]

    return (
        <Controller
            name='type'
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='font-nunit'>

                    <Label htmlFor="type">Event Type <span className='text-destructive'>*</span></Label>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange} >
                        <SelectTrigger id='type' className="max-w-fit">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='w-fit'>
                            <SelectGroup>
                                {eventTypes.map(t => (
                                    <SelectItem key={t} value={t}>
                                        {snakeToTitle(t)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </Field>
            )}
        />
    )
}
