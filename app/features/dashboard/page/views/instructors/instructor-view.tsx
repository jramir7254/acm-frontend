import Gradient from '@/components/layout/gradient'
import { Italic } from '@/components/text/typography'
import { useStudents } from '@/features/dashboard/hooks/use-admin'
import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './students-table'

type Student = {
    epccId: string
    firstName: string
    lastName: string
    course: string
    attendance: number
}
export const columns: ColumnDef<Student>[] = [
    { accessorKey: "epccId", header: "EPCC ID", },
    {
        accessorKey: "firstName", header: "First Name", cell({ getValue }) {
            const v = getValue()
            return v ? v : <Italic className='dark:text-muted-foreground'>First Name</Italic>
        },
    },
    {
        accessorKey: "lastName", header: "Last Name", cell({ getValue }) {
            const v = getValue()
            return v ? v : <Italic className='dark:text-muted-foreground'>Last Name</Italic>
        },
    },
    {
        accessorKey: "course", header: "Course", cell({ getValue }) {
            const v = getValue()
            return v ? v : <Italic className='dark:text-muted-foreground'>None Selected</Italic>
        },
    },
    { accessorKey: "attendance", header: "Events Attended" },
]


export default function InstructorView() {
    const { data, isLoading } = useStudents()

    if (isLoading) return <p>Loading...</p>

    return (
        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full flex  border-2 border-accent rounded-md">
            <DataTable columns={columns} data={data || []} />
        </Gradient>
    )
}

