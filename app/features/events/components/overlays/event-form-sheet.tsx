import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { PermissionGuard } from '@/components/layout/permission'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCreateOrUpdateEventForm } from '@/features/events/hooks/forms'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


import { ImageField } from '../forms/event-form/fields/image-field'
import { DatetimeFields } from '../forms/event-form/fields/datetime-fields'
import { BaseFields } from '../forms/event-form/fields/base-fields'
import { SelectTypeField } from '../forms/event-form/fields/select-type-field'
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionField } from '../forms/event-form/fields/description-field'
import { ExtraFields } from '../forms/event-form/fields/extra-fields'
import { useCreateOrUpdateEvent } from '@/features/events/hooks/mutations'
import { FormInput } from '@/components/form/form-input'
import { Controller } from 'react-hook-form'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import type { Event } from '../../types'

export function EventFormSheet({
    children,
    event
}: {
    children: React.ReactNode,
    event?: Event
}) {
    const [open, setOpen] = useState(false)
    const form = useCreateOrUpdateEventForm(event)
    const { mutateAsync, isPending } = useCreateOrUpdateEvent(event?.id)

    return (
        <PermissionGuard resource="events" requiredRoles={['president']}>

            <Sheet>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>

                {/* full width on mobile, capped on larger screens */}
                <SheetContent className="flex h-full w-full flex-col gap-0 overflow-hidden sm:max-w-lg md:min-w-xl">
                    <SheetHeader className="shrink-0">
                        <SheetTitle>{event ? 'Edit Event' : 'Create Event'}</SheetTitle>
                        <SheetDescription>This action cannot be undone.</SheetDescription>
                    </SheetHeader>

                    {/* takes whatever space is left — min-h-0 is what makes it shrinkable */}
                    <ScrollArea className="min-h-0 flex-1">
                        <form
                            id="event-form"
                            onSubmit={form.handleSubmit(mutateAsync)}
                            className="grid auto-rows-min gap-6 px-4 pb-4"
                        >
                            <ImageField form={form} />
                            <BaseFields form={form} />
                            <div className="flex flex-col gap-3">
                                <DatetimeFields form={form} />
                            </div>
                            <DescriptionField form={form} />
                            <SelectTypeField form={form} />
                            <ExtraFields name="externalLink" form={form} />
                            <Controller
                                name="requireSurvey"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                        <FieldContent>
                                            <FieldLabel htmlFor="form-rhf-switch-twoFactor">
                                                Require Survey
                                            </FieldLabel>
                                            <FieldDescription>
                                                Require survey if event is a workshop.
                                            </FieldDescription>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </FieldContent>
                                        <Switch
                                            id="form-rhf-switch-twoFactor"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </Field>
                                )}
                            />
                        </form>
                    </ScrollArea>
                    <SheetFooter className="shrink-0">
                        <Button
                            type="submit"
                            form="event-form"
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? 'Saving…' : 'Save changes'}
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </PermissionGuard>
    )
}