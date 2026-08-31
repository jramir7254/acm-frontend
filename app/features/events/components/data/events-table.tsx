import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { useAdminEvents, useEventsList } from '@/features/events/hooks/queries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppNavigation } from '@/hooks';
import { logger } from '@/lib/logger';
import { Link } from 'react-router';
import { formatDateAndTime } from '@/lib/utils';
import { Eye, MoreHorizontal, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function EventsTable({ semesterId = 'current' }) {
    const { data, isLoading } = useEventsList({ semesterId })


    return (


        <Table >
            <TableHeader className="sticky top-0 bg-blue-600  z-5 ">
                <TableRow className=" ">
                    <TableHead className="first:pl-6  font-nunit ">Title</TableHead>
                    <TableHead className=" font-nunit ">Start Date</TableHead>
                    <TableHead className="  font-nunit ">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="" >
                {data && data?.map((e) => {
                    const { date, time } = formatDateAndTime(e.startAt, null, true)
                    return (

                        <TableRow >
                            <TableCell className="first:pl-6 w-1/3 ">{e.title || 'Null'}</TableCell>
                            <TableCell className=''>
                                {date}
                                <br />
                                <p className='text-muted-foreground'>

                                    {time}
                                </p>
                            </TableCell>
                            <TableCell className=" ">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size={'icon'} variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <Link to={String(e.id)}>
                                            <DropdownMenuItem >
                                                <Eye />
                                                View
                                            </DropdownMenuItem>
                                        </Link>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    )
}


