import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table'
import { useCourses } from '@/features/edu/hooks/queries';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/primitives/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { FormInput } from '@/components/input';
import { Input } from '@/components/primitives/input';

export function CoursesTable() {
    const { data: courses } = useCourses()

    return (
        <Table>
            <TableCaption>A list of your rsvp'd events.</TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-inherit'>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Course Subject</TableHead>
                    <TableHead>Course Number</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses && courses.map(c => (
                    <TableRow key={c.name}>
                        <TableCell >{c.instructorFirstName}</TableCell>
                        <TableCell>{c.instructorLastName}</TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>{c.subject}</TableCell>
                        <TableCell>{c.courseNumber}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                    >
                                        Copy payment ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>View customer</DropdownMenuItem>
                                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
