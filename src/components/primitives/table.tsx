"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

function Table({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div
            data-slot="table-container"
        // className="relative w-full overflow-x-auto"
        >
            <table
                data-slot="table"
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn("[&_tr]:border-b", className)}
            {...props}
        />
    )
}



type TableBodyProps = {
    isLoading?: boolean,
    cols?: number
}

function TableBody({ className, children, cols = 3, isLoading, ...props }: React.ComponentProps<"tbody"> & TableBodyProps) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        >
            {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonRow key={`skeleton-row-${i}`} cells={cols} />
                ))
                : children
            }
        </tbody>
    )
}

function SkeletonRow({ cells }: { cells: number }) {
    return (
        <TableRow>
            {Array.from({ length: cells }).map((_, i) => (
                <TableCell key={i}>
                    <Skeleton key={`skeleton-cell-${i}`} className='w-full h-5 ' />
                </TableCell>
            ))}
        </TableRow>
    )
}


function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
                className
            )}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "font-nunit text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                "font-nunit p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                className
            )}
            {...props}
        />
    )
}

function TableCaption({
    className,
    ...props
}: React.ComponentProps<"caption">) {
    return (
        <caption
            data-slot="table-caption"
            className={cn("text-muted-foreground mt-4 text-sm", className)}
            {...props}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}
