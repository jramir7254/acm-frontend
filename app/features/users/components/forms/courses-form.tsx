
import z from 'zod';
import { Controller, useForm, type UseFormReturn } from 'react-hook-form';
import type { BaseUser } from '@/features/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { Label } from '@/components/ui/label';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { CourseSelect } from '@/features/edu/components/course-select';
import { logger } from '@/lib/logger';


import { userCoursesSchema } from '../../lib/schemas';
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxValue, useComboboxAnchor } from '@/components/ui/combobox';
import { useCourses } from '@/features/edu/hooks/queries';
import React from 'react';

export type ProfileFormValues = z.infer<typeof userCoursesSchema>;


export type ReactProfileForm = {
    form: UseFormReturn<ProfileFormValues>; // <-- critical for IntelliSense
};

export default function UserCoursesForm({
    handleSubmit,
    user,

}: {
    handleSubmit: (form: ProfileFormValues) => Promise<void>,
    user: BaseUser
}) {

    const [isUpdating, setIsUpdating] = useState(false)

    const anchor = useComboboxAnchor();
    const { data: courses } = useCourses();

    if (!courses) return null;

    const activeCourses = courses.filter(c => c.active)

    const organizedCourses = activeCourses.reduce<ProfessorGroup[]>((acc, curr) => {
        if (curr.id === -1) {
            const profGroup = { professor: "Other", courses: [] };
            acc.push(profGroup);
            profGroup.courses.push({
                id: curr.id,
                name: "None/Graduated",
            });

            return acc;

        }
        const profName = `${curr.instructorFirstName} ${curr.instructorLastName}`.trim();
        let profGroup = acc.find(p => p.professor === profName);
        if (!profGroup) {
            profGroup = { professor: profName, courses: [] };
            acc.push(profGroup);
        }
        profGroup.courses.push({
            id: curr.id,
            title: curr.title,
            subject: curr.subject,
            courseNumber: curr.courseNumber,
            name: curr.name,
        });
        return acc;
    }, []);

    const allCourses = organizedCourses.flatMap(g => g.courses);

    const form = useForm<z.infer<typeof userCoursesSchema>>({
        resolver: zodResolver(userCoursesSchema),
        defaultValues: {
            courses: user || []
        },
        mode: 'onChange',
        shouldUnregister: true,
        disabled: !isUpdating
    })

    useEffect(() => {
        form.reset();
        form.clearErrors();

    }, [isUpdating]);

    const onSubmit = async (values: z.infer<typeof userCoursesSchema>) => {
        try {

            logger.debug(values, user.courses)
            await handleSubmit(values)
            form.reset(values)
            setIsUpdating(false)
        } catch (error) {
            logger.error(error)
            setIsUpdating(false)

        }
    }



    return (
        <form id='feedback-form' className='flex flex-col h-full ' onSubmit={form.handleSubmit(onSubmit)} >

            <div className='mt-5'>
                {/* <CourseField form={form} /> */}
                <Controller
                    name="courses"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="font-nunit">
                            <FieldLabel htmlFor="course">Courses</FieldLabel>
                            <Combobox
                                multiple
                                items={organizedCourses}
                                value={field.value?.map((v: CourseItem) => allCourses.find(c => c.id === v.id) ?? v)}

                                onValueChange={(newValues: CourseItem[]) => {
                                    const unique = newValues
                                        .filter((v, i, arr) => arr.findIndex(c => c.id === v.id) === i)
                                        .map(v => allCourses.find(c => c.id === v.id) ?? v); // ✅ same reference
                                    field.onChange(unique);
                                }}
                                disabled={field.disabled}
                                itemToStringValue={(course: CourseItem) => course.id} // ✅ unique key
                            >
                                <ComboboxChips ref={anchor} className="w-full max-w-xs">
                                    <ComboboxValue>
                                        {(values: CourseItem[]) => (  // ✅ typed as objects
                                            <React.Fragment>
                                                {values.map((value) => (
                                                    <ComboboxChip key={`course-${value.id}-chip`}>{value.name}</ComboboxChip>  // ✅ .id as key, .name as label
                                                ))}
                                                <ComboboxChipsInput name={field.name} disabled={field.disabled} />
                                            </React.Fragment>
                                        )}
                                    </ComboboxValue>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}>
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(group: ProfessorGroup, index: number) => (
                                            <ComboboxGroup key={group.professor + index} items={group.courses}>
                                                <ComboboxLabel>{group.professor}</ComboboxLabel>
                                                <ComboboxCollection>
                                                    {(course: CourseItem) => (
                                                        <ComboboxItem key={`course-${course.id}`} value={course}>
                                                            {course.name}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxCollection>
                                                {index < organizedCourses.length - 1 && <ComboboxSeparator />}
                                            </ComboboxGroup>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

            </div>



            <div className='flex mt-auto'>
                {/* <Separator /> */}
                <div className='ml-auto flex gap-2'>
                    <Button
                        type='button'
                        variant={'outline'}
                        onClick={() => {
                            setIsUpdating(false);
                        }}
                        hidden={!isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={(isUpdating && !form.formState.isDirty) || form.formState.isSubmitting}
                        type={isUpdating ? "submit" : "button"}
                        onClick={() => {
                            if (!isUpdating) setIsUpdating(true); // toggle into edit mode
                        }}
                    >
                        {isUpdating ? 'Save' : 'Update'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
