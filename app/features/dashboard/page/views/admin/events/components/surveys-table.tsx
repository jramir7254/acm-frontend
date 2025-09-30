import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useStats } from '../../../../../hooks/use-admin';
import { EventProvider, useEventContext, } from '@/features/events/context/event-context';
import { ScrollArea } from '@/components/primitives/scroll-area';
import { useAppNavigation } from '@/hooks';


export function SurveysTable({ eventSurveys }) {

    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">

                        <TableHead className="first:pl-6 w-[150px]">EPCC ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Q1</TableHead>
                        <TableHead>Q2</TableHead>
                        <TableHead>Q3</TableHead>
                        <TableHead>Q4</TableHead>
                        <TableHead>Q5</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {eventSurveys && eventSurveys.map(u => (
                        <TableRow className=" bg-background cursor-pointer" >
                            <TableCell className="first:pl-6 ">{u?.epccId || 'Null'}</TableCell>
                            <TableCell>{u?.firstName}</TableCell>
                            <TableCell>{u?.lastName || 0}</TableCell>
                            <TableCell >{u.q1}</TableCell>
                            <TableCell >{u.q2}</TableCell>
                            <TableCell >{u.q3}</TableCell>
                            <TableCell >{u.q4}</TableCell>
                            <TableCell >{u.q5}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </ScrollArea>

    )
}


