import React from 'react'
import { Italic } from '@/components/text/typography'
import { RefetchButton } from '@/components/ui/refetch-button'
import { useUsers } from '@/features/users/hooks/users/queries'
import { Button } from '@/components/primitives/button'
import { ScrollArea } from '@/components/primitives/scroll-area'
import { RoleBadge } from '../../role-badge'
import { useAppNavigation } from '@/hooks'
import { DropdownMenuItem } from '@/components/primitives/dropdown-menu'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'
import { ListFilter } from 'lucide-react'
import { TableContainer, FilteredColumn, SmartTable, SmartTableBody, SmartTableHeader, GlobalFilter, RowActions } from "@/components/data/smart-table";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type FilterFn, type SortingState } from '@tanstack/react-table'
import { CustomBadge } from '@/components/ui/custom-badge'
import { roleBadgeConfig } from '@/components/ui/badge-configs'

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
    role: string
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
            return <CustomBadge config={roleBadgeConfig} itemKey={v as string} />
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

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data: users ?? [],
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




    return (
        <TableContainer table={table}>
            <div className='flex-1 space-y-3'>
                <div className='inline-flex gap-2'>

                    <GlobalFilter placeholder='Search Users' className='max-w-xs' />
                    <RefetchButton queryKey={queryKeys.users.list()} />
                </div>


                <ScrollArea className='overflow-hidden rounded-t-lg w-[75%]'>
                    <SmartTable className=' flex-1 max-h-[450px] rounded-t-lg '>
                        <SmartTableHeader className='sticky top-0 rounded-t-lg bg-accent overflow-hidden z-5 ' />
                        <SmartTableBody className='' />
                    </SmartTable>
                </ScrollArea>

            </div>
        </TableContainer>
    )
}
