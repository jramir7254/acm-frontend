import Gradient from "@/components/layout/gradient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { CoursesTable, UsersTable, EventsTable } from "../../components/data"
import { CourseForm } from "../../components/forms/course-form"

export default function AdminView() {
    return (
        <Gradient className='m-10 w-full rounded-[12px] border-2 border-accent'>
            <Tabs defaultValue="courses" className="size-full">
                <TabsList>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="courses" className="grid grid-cols-2">
                    <CoursesTable />
                    <CourseForm />
                </TabsContent>
                <TabsContent value="users">
                    <UsersTable />
                </TabsContent>
                <TabsContent value="events">
                    <EventsTable />
                </TabsContent>
            </Tabs>
        </Gradient>
    )
}
