import React from 'react'
import { Italic } from '@/components/text/typography'
import { usersKeys, useStudents, useUsers } from '@/features/dashboard/hooks/use-admin'
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type FilterFn, type SortingState } from '@tanstack/react-table'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/primitives/popover"
// import { DataTable } from './students-table'
import { ListFilter, RefreshCwIcon } from 'lucide-react'
import { TableContainer, FilteredColumn, SmartTable, SmartTableBody, SmartTableHeader, GlobalFilter, RowActions } from "@/components/data/smart-table";
import { Button } from '@/components/primitives/button'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { RoleBadge } from '@/features/dashboard/components/ui/role-badge'
import { TableRow } from '@/components/primitives/table'
import { useAppNavigation } from '@/hooks'
import { DropdownMenuItem } from '@/components/primitives/dropdown-menu'
import { toast } from 'sonner'
import { queryClient } from '@/providers/query-client'
import { logger } from '@/lib/logger'

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
    { accessorKey: "epccEmail", header: "EPCC Email", },

    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <FilteredColumn column='role'>
                    <Button size={'icon'} variant={'ghost'}>
                        <ListFilter />
                    </Button>
                </FilteredColumn>
            )
        },
        filterFn: arrayIncludesSome,
        cell({ getValue }) {
            const v = getValue()
            return <RoleBadge role={v} />
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell({ row }) {
            const user = row.original

            return (
                <DropNav userId={user.epccId} />
            )
        },
    }
]


function DropNav({ userId }: { userId: string }) {
    const { toUser } = useAppNavigation()

    return (
        <RowActions>
            <DropdownMenuItem onClick={() => toUser(userId)}>View</DropdownMenuItem>
            <DropdownMenuItem variant='destructive' onClick={() => { toast('User Deleted') }}>Delete</DropdownMenuItem>
        </RowActions>
    )
}

export default function UsersTable() {
    const { data: users } = useUsers()
    // const { toUser } = useAppNavigation()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [columnFilters, setColumnFilters] = React.useState([])

    const table = useReactTable({
        data: users ? users : [],
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
        queryClient.invalidateQueries({ queryKey: usersKeys.all })
        logger.info('done')

    }


    return (
        <TableContainer table={table}>
            <div className='flex-1 space-y-3'>
                <div className='inline-flex gap-2'>

                    <GlobalFilter placeholder='Search Users' className='max-w-xs' />
                    <Button variant={'outline'} size={'icon'} onClick={fetchUsers}><RefreshCwIcon /></Button>
                </div>


                <ScrollArea className='overflow-hidden rounded-t-lg w-[75%]'>
                    <SmartTable className=' flex-1 max-h-[500px] rounded-t-lg '>
                        <SmartTableHeader className='sticky top-0 rounded-t-lg bg-accent overflow-hidden z-5 ' />
                        <SmartTableBody className='' />
                    </SmartTable>
                </ScrollArea>

            </div>
        </TableContainer>
    )
}
