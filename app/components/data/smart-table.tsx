import React, { useState } from 'react'
import { createContext, useContext } from 'react'
import { flexRender, type Table } from '@tanstack/react-table';
import { Input } from '@/components/primitives/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/primitives/popover';
import { Checkbox } from '@/components/primitives/checkbox';
import { Label } from '@/components/primitives/label';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as STable } from '@/components/primitives/table';
import { columns } from '@/features/dashboard/page/views/instructors/instructor-view';
import { logger } from '@/lib/logger';
import { Separator } from '../primitives/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../primitives/dropdown-menu';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../primitives/button';


export const TableContext = createContext<Table<any> | null>(null)

export function useTableContext() {
    const ctx = useContext(TableContext)
    if (!ctx) throw new Error('Should be used in table container')
    return ctx
}

export function TableContainer({
    children,
    table
}: {
    children: React.ReactNode,
    table: Table<any>
}) {
    return (
        <TableContext.Provider value={table}>
            {children}
        </TableContext.Provider>
    )
}


export function GlobalFilter({ ...props }: React.ComponentProps<"input">) {
    const table = useTableContext()
    if (!table) return

    return (
        <Input
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            {...props}
        />
    )
}


export function SmartTable({ className, ...props }: React.ComponentProps<"table">) {
    return (

        <div className={className}>
            <STable {...props} />
        </div>
    )
}


export function SmartTableHeader({ ...props }: React.ComponentProps<"thead">) {
    const table = useTableContext()
    if (!table) return
    return (

        <TableHeader {...props} >
            {
                table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))
            }
        </TableHeader >
    )
}



export function SmartTableBody({ ...props }: React.ComponentProps<"tbody">) {
    const table = useTableContext()
    if (!table) return
    return (

        <TableBody {...props}>
            {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow >
                ))
            ) : (
                <TableRow >
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

export function FilteredColumn({ column, children }: { column: string, children: React.ReactNode }) {
    const table = useTableContext()
    if (!table) return

    const col = table.getColumn(column);


    const current = (col?.getFilterValue() as string[]) ?? [];

    const filters = [...new Set(table.getCoreRowModel().rows.filter(f => f.original[column] !== null).map((s) => s.original[column]))]

    logger.debug('filters', filters)


    const toggle = (option: string) => {
        const next = current.includes(option)
            ? current.filter(x => x !== option)
            : [...current, option];

        col?.setFilterValue(next);
    };

    return (
        <div className='inline-flex items-center gap-1'>
            <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
            <Popover>
                <PopoverTrigger asChild>
                    {children}
                </PopoverTrigger>
                <PopoverContent className='w-fit flex flex-col gap-2'>
                    {filters.map(f => (
                        <>
                            <div key={`filter-[${f}]`} className='inline-flex items-center gap-1'>
                                <Checkbox
                                    id={f}
                                    className='cursor-pointer'
                                    checked={current.includes(f)}
                                    onCheckedChange={() => toggle(f)}
                                />
                                <Label htmlFor={f} className='bg-white/10 p-1 rounded'>{f}</Label>
                            </div>
                            <Separator />
                        </>
                    ))}
                </PopoverContent>

            </Popover>
        </div>
    )
}


export function SortableColumn({ column }: { column: string }) {
    const table = useTableContext()
    if (!table) return

    const col = table.getColumn(column);



    return (
        <div className='inline-flex items-center gap-1'>
            <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
            <Button
                variant="ghost"
                size={'icon'}
                onClick={() => col?.toggleSorting(col?.getIsSorted() === "asc")}
            >
                <ArrowUpDown className=" h-4 w-4" />
            </Button>
        </div>
    )


}

export function RowActions({ children }: { children: React.ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
