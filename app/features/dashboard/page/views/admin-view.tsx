import Gradient from "@/components/layout/gradient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { CoursesTable } from "../../components/data"
import { CourseForm } from "../../components/forms"

export default function AdminView() {
    return (
        <Gradient className=' size-full rounded-[12px] border-2 border-accent grid grid-cols-2'>

            <CoursesTable />
            <CourseForm />

        </Gradient>
    )
}
