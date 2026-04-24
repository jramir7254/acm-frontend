import React from 'react'
import { useSearchParams } from 'react-router';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '../ui/select';
import { capitalize } from '@/lib/utils';
import { useSemesters } from '@/features/app/use-semester';

export function SemesterSelect() {
    const [searchParams, setSearchParams] = useSearchParams({ semester: 'current' });
    const { data: semesters } = useSemesters()


    if (!semesters) return

    const currSemester = semesters.find(s => s.isCurrent)
    const onChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        // Set the new parameter value
        newParams.set('semester', value);
        setSearchParams(newParams)
    }

    return (
        <Select value={searchParams.get('semester') || 'current'} onValueChange={onChange}>
            <SelectTrigger id='semester' className="max-w-fit font-nunit">
                <SelectValue placeholder="Select A Semester" />
            </SelectTrigger>
            <SelectContent className='w-fit'>
                <SelectGroup>
                    <SelectLabel>Current</SelectLabel>
                    <SelectItem value={'current'}>
                        {currSemester && capitalize(currSemester.season) + " " + currSemester.year}
                    </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>Past</SelectLabel>
                    {semesters.filter(s => !s.isCurrent).map(semester => (
                        <SelectItem key={`semester_${semester.id}`} value={String(semester.id)}>
                            {semester && capitalize(semester.season) + " " + semester.year}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
