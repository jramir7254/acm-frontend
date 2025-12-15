import React from 'react'
import { Controller } from 'react-hook-form'
import { type EventReactForm } from '../event-form'
import { Field, FieldError, FieldLabel } from '@/components/primitives/field'
import { Input } from '@/components/primitives/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/primitives/popover"
import { Image } from 'lucide-react'
import { Empty } from '@/components/primitives/empty'
import { Label } from '@/components/primitives/label'

export function ImageField({ form }: EventReactForm) {

    const imgUrl = form.watch("imageUrl");

    return (
        <Empty className="border-2 rounded h-fit max-h-1/2 overflow-hidden relative aspect-video w-full">
            <Controller
                name='imageUrl'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className='font-nunit'>
                        <Popover modal>
                            <PopoverTrigger asChild>
                                <div>
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt="Event preview"
                                            className="cursor-pointer absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="cursor-pointer  w-full h-full flex items-center justify-center">
                                            <Image />
                                        </div>
                                    )}
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='space-y-2 lg:w-[500px]'>
                                <Label htmlFor="imageUrl">Image Url</Label>
                                <Input
                                    id="imageUrl"
                                    {...field}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                )}
            />
        </Empty>
    )
}
