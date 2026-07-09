import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCourses } from '@/features/edu/hooks/queries';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Plus, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteCourse } from '@/features/admin/hooks/use-admin';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { CourseForm } from '../course-form';
import type { Course } from '../../types';


export function CoursesTable() {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)                         // ← new
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null) // ← new
    const { data: courses } = useCourses()
    const { mutateAsync } = useDeleteCourse()

    return (
        <>
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
                        <TableRow key={c.name + c.id}>
                            <TableCell>{c.instructorFirstName}</TableCell>
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
                                        {/* ✅ No SheetTrigger here — just a plain item */}
                                        <DropdownMenuItem
                                            onSelect={(e) => {
                                                e.preventDefault()
                                                setSelectedCourse(c)
                                                setEditOpen(true)
                                            }}
                                        >
                                            <Edit />
                                            Edit
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onSelect={(e) => {
                                                e.preventDefault()       // ← stop dropdown from unmounting
                                                setSelectedCourseId(c.id)
                                                setDeleteOpen(true)
                                            }}
                                        >
                                            <TrashIcon />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ✅ Sheet lives outside the DropdownMenu */}
            <Sheet open={editOpen} onOpenChange={setEditOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit course</SheetTitle>
                        <SheetDescription>This action cannot be undone.</SheetDescription>
                    </SheetHeader>
                    {selectedCourse && <CourseForm course={selectedCourse} />}
                </SheetContent>
            </Sheet>

            {/* ✅ AlertDialog lives outside the DropdownMenu */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="w-fit">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-osans tracking-wide font-medium">
                            Delete course {selectedCourseId}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button
                                variant="default"
                                onClick={async () => {
                                    if (!selectedCourseId) return
                                    await mutateAsync(selectedCourseId)
                                    setDeleteOpen(false)
                                }}
                            >
                                Confirm
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}