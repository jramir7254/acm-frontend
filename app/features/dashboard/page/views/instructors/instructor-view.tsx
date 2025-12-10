import Gradient from '@/components/layout/gradient'
import { Italic, Paragraph } from '@/components/text/typography'
import { usersKeys, useStudents } from '@/features/dashboard/hooks/use-admin'
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type FilterFn, type SortingState } from '@tanstack/react-table'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/primitives/popover"
// import { DataTable } from './students-table'
import { InfoIcon, ListFilter, RefreshCwIcon } from 'lucide-react'
import { Checkbox } from '@/components/primitives/checkbox'
import { TableContainer, FilteredColumn, SmartTable, SmartTableBody, SmartTableHeader, GlobalFilter } from "@/components/data/smart-table";
import React from 'react'
import { Button } from '@/components/primitives/button'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { logger } from '@/lib/logger'
import { queryClient } from '@/providers/query-client'
import { RefetchButton } from '@/components/ui/refetch-button'

export const arrayIncludesSome: FilterFn<any> = (row, columnId, filterValues) => {
    // filterValues is your array of selected options
    if (!Array.isArray(filterValues) || filterValues.length === 0) return true;

    const rowValue = row.getValue(columnId);
    return filterValues.includes(rowValue);
};


type Student = {
    epccId: string
    epccEmail: string
    firstName: string
    lastName: string
    course: string
    attendance: number,
    missing: number
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
    { accessorKey: "epccEmail", header: "EPCC Email", },

    {
        accessorKey: "course",
        header: ({ column }) => {
            return (
                <FilteredColumn column='course'>
                    <Button size={'icon'} variant={'ghost'}>

                        <ListFilter />
                    </Button>
                </FilteredColumn>
            )
        },
        filterFn: arrayIncludesSome,
        cell({ getValue }) {
            const v = getValue()
            return v ? v : <Italic className='dark:text-muted-foreground'>None Selected</Italic>
        },
    },
    { accessorKey: "attendance", header: "Events Attended" },
    {
        accessorKey: "missing",
        header(props) {
            return <p className='inline-flex items-center gap-1'>
                Missing Surveys
                <span
                    className='relative'
                    title={`
                    This number represents the events a student has attended without completing the 
                required feedback survey. While it is up to your discretion whether to count these 
                events toward a student’s attendance, we strongly encourage you to remind students 
                to complete all feedback surveys. These surveys are essential for external evaluation 
                and help ensure the continued improvement and support of our programs.
                `}>
                    <small className='absolute top-[-15px] left-[-15px] text-muted-foreground'>Hover me</small>
                    <InfoIcon className='cursor-pointer text-red-400' size={15} />
                </span>
            </p>
        },
        cell({ getValue }) {
            const v = getValue()
            return <Paragraph className='text-red-400'>{v as string} </Paragraph>
        },
    },
]


export default function InstructorView() {
    const { data, isLoading } = useStudents()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [columnFilters, setColumnFilters] = React.useState([])

    const table = useReactTable({
        data: data ? data : [],
        columns,
        state: {
            sorting,
            globalFilter,
            columnFilters,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const fetchUsers = () => {
        logger.info('clicked')
        queryClient.invalidateQueries({ queryKey: usersKeys.students() })
        logger.info('done')

    }


    if (isLoading) return <p>Loading...</p>

    return (
        <Gradient via="rgba(50,50,50,0.20)" className="p-10 size-full flex  border-2 border-accent rounded-md">
            <TableContainer table={table}>
                <div className='flex-1 space-y-3'>
                    <div className='inline-flex items-center gap-1'>
                        <GlobalFilter placeholder='Search Students' className='max-w-xs' />
                        <RefetchButton queryKey={usersKeys.students()} />

                    </div>

                    <ScrollArea className='overflow-hidden rounded-t-lg'>
                        <SmartTable className=' flex-1 max-h-[500px] rounded-t-lg'>
                            <SmartTableHeader className='sticky top-0 rounded-t-lg bg-accent overflow-hidden z-5 ' />
                            <SmartTableBody className='' />
                        </SmartTable>
                    </ScrollArea>

                </div>
            </TableContainer>
            {/* <DataTable columns={columns} data={data || []} /> */}
        </Gradient>
    )
}

