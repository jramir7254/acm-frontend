import { ScrollArea } from '@/components/primitives/scroll-area'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/primitives/table'
import { useEventField } from '../../hooks/event/queries'
import { Italic } from '@/components/text/typography'
import { CustomBadge, type BadgeConfig } from '@/components/ui/custom-badge'
import { useAppNavigation } from '@/hooks'

type DataType = 'rsvps' | 'attendance'

interface DataModel {
    epccId: string
    firstName: string
    lastName: string,
    action: string,
    status: string,
}

export function UsersTable({ eventId, field }: { eventId: number, field: DataType }) {
    const { data, isLoading } = useEventField(eventId, field)
    const { toUser } = useAppNavigation()

    if (!data || !Array.isArray(data)) return <p>no data</p>

    const badgeConfig: BadgeConfig = field === 'rsvps' ? {
        confirmed: { variant: 'outline', color: 'green' },
        canceled: { variant: 'outline', color: 'red' },
        waitlist: { variant: 'outline', color: 'yellow' },
    } : {
        complete: { variant: 'outline', color: 'green' },
        missing: { variant: 'outline', color: 'red' },

    }


    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6 w-[150px]">EPCC ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="border">
                    {data.map((u: DataModel, idx) => (
                        <TableRow className=" bg-background cursor-pointer" key={`event_${eventId}_${idx}`} onClick={() => toUser(u.epccId)}>
                            <TableCell className="first:pl-6 ">{u.epccId}</TableCell>
                            <TableCell>{u.firstName || <Italic muted>First Name</Italic>}</TableCell>
                            <TableCell>{u.lastName || <Italic muted>Last Name</Italic>}</TableCell>
                            <TableCell >{new Date(u.action).toLocaleDateString()}</TableCell>
                            <TableCell ><CustomBadge config={badgeConfig} itemKey={u.status} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
