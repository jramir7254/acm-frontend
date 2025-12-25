import { ScrollArea } from '@/components/primitives/scroll-area'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/primitives/table'
import { useEventField } from '../../hooks/event/queries'
import { Italic } from '@/components/text/typography'
import { useAppNavigation } from '@/hooks'

type DataType = 'rsvps' | 'attendance'

interface DataModel {
    epccId: string
    firstName: string
    lastName: string,
    q1: number,
    q2: number,
    q3: number,
    q4: number,
    q5?: string | null,
}

export function FeedbackTable({ eventId }: { eventId: number }) {
    const { data, isLoading } = useEventField(eventId, 'feedback')
    const { toUser } = useAppNavigation()

    if (!data || !Array.isArray(data)) return <p>no data</p>


    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6 w-[150px]">EPCC ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Question 1</TableHead>
                        <TableHead>Question 2</TableHead>
                        <TableHead>Question 3</TableHead>
                        <TableHead>Question 4</TableHead>
                        <TableHead>Question 5</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {data.map((u: DataModel, idx) => (
                        <TableRow className=" bg-background cursor-pointer" key={`event_${eventId}_${idx}`} onClick={() => toUser(u.epccId)}>
                            <TableCell className="first:pl-6 ">{u.epccId}</TableCell>
                            <TableCell>{u.firstName || <Italic muted>First Name</Italic>}</TableCell>
                            <TableCell>{u.lastName || <Italic muted>Last Name</Italic>}</TableCell>
                            <TableCell >{u.q1}</TableCell>
                            <TableCell >{u.q2}</TableCell>
                            <TableCell >{u.q3}</TableCell>
                            <TableCell >{u.q4}</TableCell>
                            <TableCell className='overflow-ellipsis max-w-20'>{u.q5 || <Italic muted>None</Italic>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
