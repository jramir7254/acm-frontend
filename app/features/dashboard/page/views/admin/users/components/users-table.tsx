import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/primitives/table"
import { ScrollArea } from "@/components/primitives/scroll-area"
import { useUsers } from "@/features/dashboard/hooks/use-admin"
import { useAppNavigation } from "@/hooks"

export function UsersTable() {
    const { data: users } = useUsers()
    const { toUser } = useAppNavigation()

    const extra = [
        { epccId: "12312412" },
        { epccId: "12312415" },
        { epccId: "12312425" },
        { epccId: "12312485" },
        { epccId: "12312410" },
    ]

    const rows = (users ?? []).concat(extra)



    return (
        <ScrollArea className=" max-h[500px] h-[500px] rounded-t-md ">

            <Table className="px-5 ">
                <TableHeader className="sticky top-0 bg-accent  z-5 ">
                    <TableRow className=" ">
                        <TableHead className="first:pl-6 w-[150px]">EPCC ID</TableHead>
                        <TableHead >First Name</TableHead>
                        <TableHead >Last Name</TableHead>
                        <TableHead >EPCC Email</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="border">
                    {rows.map((u) => (

                        <TableRow key={u.epccId} className=" bg-background cursor-pointer" onClick={() => toUser(u?.epccId)}>
                            <TableCell className="first:pl-6 ">{u?.epccId}</TableCell>
                            <TableCell>{u?.firstName ?? "Null"}</TableCell>
                            <TableCell>{u?.lastName ?? "Null"}</TableCell>
                            <TableCell>{u?.epccEmail}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>

                <TableCaption>A list of your rsvp&apos;d events.</TableCaption>
            </Table>
        </ScrollArea>
    )
}
