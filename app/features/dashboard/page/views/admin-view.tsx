import Gradient from "@/components/layout/gradient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import CoursesTable from "../../components/data/courses-table"
import { CourseForm } from "../../components/forms/course-form"

export default function AdminView() {
    return (
        <Gradient className='m-10 w-full rounded-[12px] border-2 border-accent'>
            <Tabs defaultValue="account" className="size-full">
                <TabsList>
                    <TabsTrigger value="account">Courses</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="grid grid-cols-2">
                    <CoursesTable />
                    <CourseForm />
                </TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </Gradient>
    )
}
