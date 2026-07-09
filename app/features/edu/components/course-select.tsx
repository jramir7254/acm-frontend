import React from 'react'
import { useCourses } from '../hooks/queries'
import { SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { createCourseName } from '@/lib/utils'

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxSeparator,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { Checkbox } from '@/components/ui/checkbox'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ReactProfileForm } from '@/features/users/components/user/forms/update-form/form'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { logger } from '@/lib/logger'

type CourseItem = {
    id: string;
    title: string;
    subject: string;
    courseNumber: string;
    name: string;
};

type ProfessorGroup = {
    professor: string;
    courses: CourseItem[];
};

export function CourseSelect({ form }: ReactProfileForm) {
    const anchor = useComboboxAnchor();
    const { data: courses } = useCourses();

    if (!courses) return null;

    const organizedCourses = courses.reduce<ProfessorGroup[]>((acc, curr) => {
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


    // logger.debug({ courses, organizedCourses })

    return (
        <Controller
            name="courses"
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="font-nunit">
                    <Label htmlFor="course">Courses</Label>
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
                </Field>
            )}
        />
    );
}










// export function CourseSelect() {
//     const { data: courses } = useCourses()

//     if (!courses) return

//     return (
//         <SelectContent className='w-fit'>
//             <SelectGroup>
//                 {courses.map(course => (
//                     <SelectItem key={`course_${course.id}`} value={String(course.id)}>
//                         {createCourseName(course)}
//                     </SelectItem>
//                 ))}
//             </SelectGroup>
//         </SelectContent>
//     )
// }
