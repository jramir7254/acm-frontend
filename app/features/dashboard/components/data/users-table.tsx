import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'

import { useUsers } from '../../hooks/use-admin';

export function UsersTable() {
    const { data: users } = useUsers()

    return (
        <Table className='overflow-y-scroll'>
            <TableCaption>A list of your rsvp'd events.</TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-inherit'>
                    <TableHead>EPCC ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>EPCC Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users && users.map(u => (
                    <TableRow key={u.epccId}>
                        <TableCell>{u.epccId}</TableCell>
                        <TableCell >{u.firstName || 'Null'}</TableCell>
                        <TableCell>{u.lastName || 'Null'}</TableCell>
                        <TableCell>{u.epccEmail}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
