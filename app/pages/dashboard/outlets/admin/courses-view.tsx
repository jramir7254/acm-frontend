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

export default function CoursesView() {
    return (
        <div>

            <Sheet>
                <SheetTrigger asChild>

                    <Button>
                        <Plus />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add a course</SheetTitle>
                        <SheetDescription>This action cannot be undone.</SheetDescription>
                    </SheetHeader>
                    <CourseForm />
                </SheetContent>
            </Sheet>


            <CoursesTable />
        </div>
    )
}
