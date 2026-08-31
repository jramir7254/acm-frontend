import { Button } from '@/components/ui/button'
import { CoursesTable } from '@/features/edu/components/tables/courses-table'
import { Plus } from 'lucide-react'
import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CourseForm } from '@/features/edu/components/course-form'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CoursesView() {
    return (
        <div className='flex flex-col gap-5 max-w-[100vw]'>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className='w-fit self-end'>
                        <Plus />
                        Add a course
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add a course</SheetTitle>
                        <SheetDescription>Enter new course info.</SheetDescription>
                    </SheetHeader>
                    <CourseForm />
                </SheetContent>

            </Sheet>
            <ScrollArea className=''>

                <CoursesTable />
            </ScrollArea>
        </div>
    )
}
